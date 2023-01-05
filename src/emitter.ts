/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import is from '@adonisjs/application/helpers/is'
import type { Application } from '@adonisjs/application'
import Emittery, { type UnsubscribeFunction } from 'emittery'
import { moduleExpression, moduleCaller, moduleImporter } from '@adonisjs/fold'

import debug from './debug.js'
import { EventsBuffer } from './events_buffer.js'
import type { Constructor, EventsListItem, Listener, ListenerMethod } from './types.js'

/**
 * Event emitter is built on top of emittery with support for defining
 * event listeners as string expressions.
 */
export class Emitter<EventsList extends Record<string | symbol | number, any>> {
  /**
   * A collection of events and their listeners. We do not track listeners
   * listening for events only once.
   */
  #eventsListeners: Map<
    keyof EventsList,
    Map<Listener<any, Constructor<any>>, ListenerMethod<any>>
  > = new Map()

  /**
   * Underlying transport to emit events
   */
  #transport = new Emittery()

  /**
   * Events buffer. The events are collected inside an in-memory
   * buffer during fakes
   */
  #eventsBuffer?: EventsBuffer<EventsList>

  /**
   * A set of events to fake
   */
  #eventsToFake: Set<keyof EventsList | '*'> = new Set()

  /**
   * Error handler to catch all errors thrown by listeners
   */
  #errorHandler?: (event: keyof EventsList, error: any, data: any) => void

  /**
   * Reference to AdonisJS application, we need the application root
   * and container reference from it.
   */
  #app: Application<any, any>

  /**
   * Returns a map of events and their registered listeners. The
   * map key is the event name and the value is another map
   * of listeners.
   *
   * The listeners map key is the original binding listener
   * and the value is a callback function.
   */
  get eventsListeners() {
    return this.#eventsListeners
  }

  constructor(app: Application<any, any>) {
    this.#app = app
  }

  /**
   * Returns the event listeners map
   */
  #getEventListeners<Name extends keyof EventsList, T extends Constructor<any>>(name: Name) {
    if (!this.#eventsListeners.has(name)) {
      this.#eventsListeners.set(name, new Map())
    }

    return this.#eventsListeners.get(name) as Map<
      Listener<EventsList[Name], T>,
      ListenerMethod<EventsList[Name]>
    >
  }

  /**
   * Returns the listener function for a given import expression. We cache
   * the listener functions to ensure that a give import expression leads
   * to a single event listener only.
   */
  #resolveEventListener<Data, T extends Constructor<any>>(
    listener: Listener<Data, T>
  ): ListenerMethod<Data> {
    /**
     * Parse string based listener
     */
    if (typeof listener === 'string') {
      return moduleExpression(listener, this.#app.appRoot).toCallable(this.#app.container)
    }

    /**
     * Parse array based listener with the listener reference
     * or lazily imported listener class
     */
    if (Array.isArray(listener)) {
      const listenerModule = listener[0]
      const method = (listener[1] as string) || 'handle'

      /**
       * Class reference
       */
      if (is.class_(listenerModule)) {
        return moduleCaller(listenerModule, method).toCallable(this.#app.container)
      }

      /**
       * Lazily loaded module
       */
      return moduleImporter(listenerModule, method).toCallable(this.#app.container)
    }

    return listener
  }

  /**
   * Register a global error handler
   */
  onError(callback: (event: keyof EventsList, error: any, data: any) => void): this {
    this.#errorHandler = callback
    return this
  }

  /**
   * Listen for an event. The method returns the unsubscribe function.
   */
  on<Name extends keyof EventsList, T extends Constructor<any>>(
    event: Name,
    listener: Listener<EventsList[Name], T>
  ): UnsubscribeFunction {
    const eventListeners = this.#getEventListeners<Name, T>(event)

    /**
     * Track event listener so that we can re-use resolved callable
     * methods and also return a list of events that has one or
     * more listeners.
     */
    if (!eventListeners.has(listener)) {
      eventListeners.set(listener, this.#resolveEventListener(listener))
    }

    if (debug.enabled) {
      debug('registering event listener, event: "%s", listener: %O', event, listener)
    }

    this.#transport.on(event, eventListeners.get(listener)!)
    return () => this.off(event, listener)
  }

  /**
   * Listen for an event only once
   */
  once<Name extends keyof EventsList, T extends Constructor<any>>(
    event: Name,
    listener: Listener<EventsList[Name], T>
  ): void {
    const resolvedListener = this.#resolveEventListener(listener)

    if (debug.enabled) {
      debug('registering one time event listener, event: "%s", listener: %O', event, listener)
    }

    /**
     * Internally emittery does the same thing, but they do not await the
     * handler, therefore the `once` events listeners can finish
     * after "await emitter.emit" call as well.
     */
    const off = this.#transport.on(event, async (data) => {
      off()
      debug('removing one time event listener, event: "%s"', event)
      await resolvedListener(data)
    })
  }

  /**
   * Attach a listener to listen for all the events. Wildcard listeners
   * can only be defined as inline callbacks.
   */
  onAny(
    listener: (event: keyof EventsList, data: EventsListItem<EventsList>) => any | Promise<any>
  ): UnsubscribeFunction {
    return this.#transport.onAny(listener)
  }

  /**
   * Emit event. The event listeners will be called asynchronously
   * in parallel.
   *
   * You can await this method to wait for events listeners to finish
   */
  async emit<Name extends keyof EventsList>(event: Name, data: EventsList[Name]): Promise<void> {
    if (this.#eventsToFake.has(event) || this.#eventsToFake.has('*')) {
      debug('faking emit. event: "%s", data: %O', event, data)
      this.#eventsBuffer!.events.push({ name: event, data })
      return
    }

    try {
      await this.#transport.emit(event, data)
    } catch (error) {
      if (this.#errorHandler) {
        this.#errorHandler(event, error, data)
      } else {
        throw error
      }
    }
  }

  /**
   * Remove a specific listener for an event
   */
  off<Name extends keyof EventsList, T extends Constructor<any>>(
    event: Name,
    listener: Listener<EventsList[Name], T>
  ): void {
    const listeners = this.#getEventListeners<Name, T>(event)

    const resolvedListener = listeners.get(listener)
    if (!resolvedListener) {
      return
    }

    if (debug.enabled) {
      debug('removing listener, event: "%s", listener: %O', event, listener)
    }

    listeners.delete(listener)
    this.#transport.off(event, resolvedListener)
  }

  /**
   * Remove a specific listener listening for all the events
   */
  offAny(
    listener: (event: keyof EventsList, data: EventsListItem<EventsList>) => any | Promise<any>
  ): this {
    this.#transport.offAny(listener)
    return this
  }

  /**
   * Remove a specific listener for an event
   *
   * @alias "off"
   */
  clearListener<Name extends keyof EventsList, T extends Constructor<any>>(
    event: Name,
    listener: Listener<EventsList[Name], T>
  ): void {
    return this.off(event, listener)
  }

  /**
   * Clear all listeners for a specific event
   */
  clearListeners(event: keyof EventsList) {
    debug('clearing all listeners for event "%s"', event)
    this.#transport.clearListeners(event)
    this.#eventsListeners.delete(event)
  }

  /**
   * Clear all listeners for all the events
   */
  clearAllListeners() {
    debug('clearing all event listeners')
    this.#transport.clearListeners()
    this.#eventsListeners.clear()
  }

  /**
   * Get count of listeners for a given event or all the events
   */
  listenerCount<Name extends keyof EventsList>(event?: Name): number {
    return this.#transport.listenerCount(event)
  }

  /**
   * Find if an event has one or more listeners
   */
  hasListeners<Name extends keyof EventsList>(event?: Name): boolean {
    return this.listenerCount(event) > 0
  }

  /**
   * Fake one or more events. The listeners for faked events will
   * not be invoked.
   *
   * The return value is an events buffer that collects all the
   * events within memory.
   *
   * Calling this method one than once drops the existing fakes and
   * creates new one.
   */
  fake(events?: (keyof EventsList)[]): EventsBuffer<EventsList> {
    this.restore()
    this.#eventsBuffer = new EventsBuffer()

    if (!events) {
      debug('faking all events')
      this.#eventsToFake.add('*')
    } else {
      debug('faking events: %O', events)
      events.forEach((event) => this.#eventsToFake.add(event))
    }

    return this.#eventsBuffer
  }

  /**
   * Restore fakes
   */
  restore() {
    debug('restoring existing fakes')
    this.#eventsToFake.clear()
    this.#eventsBuffer?.flush()
    this.#eventsBuffer = undefined
  }
}
