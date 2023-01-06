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
import type { Listener, Constructor, ListenerMethod, AllowedEventTypes } from './types.js'

/**
 * Event emitter is built on top of emittery with support class based
 * events and listeners
 */
export class Emitter<EventsList extends Record<string | symbol | number, any>> {
  /**
   * Event classes to symbols mapping. We need symbols as emittery
   * does not support class based event names
   */
  #eventsClassSymbols: Map<Constructor<any>, symbol> = new Map()

  /**
   * A collection of events and their listeners. We do not track listeners
   * listening for events only once
   */
  #eventsListeners: Map<
    AllowedEventTypes,
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
  #eventsToFake: Set<AllowedEventTypes | '*'> = new Set()

  /**
   * Error handler to catch all errors thrown by listeners
   */
  #errorHandler?: (event: keyof EventsList | Constructor<any>, error: any, data: any) => void

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
   * Returns the symbol for a class based event.
   */
  #getEventClassSymbol(event: Constructor<any>): symbol {
    if (!this.#eventsClassSymbols.has(event)) {
      this.#eventsClassSymbols.set(event, Symbol(event.name))
    }

    return this.#eventsClassSymbols.get(event)!
  }

  /**
   * Normalizes the event to emittery supported data types. The class
   * constructors are cached against a unique symbol.
   */
  #resolveEvent(event: AllowedEventTypes): string | symbol | number {
    if (is.class_(event)) {
      return this.#getEventClassSymbol(event)
    }

    return event
  }

  /**
   * Returns the event listeners map
   */
  #getEventListeners(event: AllowedEventTypes) {
    if (!this.#eventsListeners.has(event)) {
      this.#eventsListeners.set(event, new Map())
    }

    return this.#eventsListeners.get(event)!
  }

  /**
   * Normalizes the event listener to a function that can be passed to
   * emittery.
   */
  #normalizeEventListener(listener: Listener<any, Constructor<any>>): ListenerMethod<any> {
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
   * Resolves the event listener either from the cache or normalizes
   * it and stores it inside the cache
   */
  #resolveEventListener(
    event: AllowedEventTypes,
    listener: Listener<any, Constructor<any>>
  ): ListenerMethod<any> {
    const eventListeners = this.#getEventListeners(event)
    if (!eventListeners.has(listener)) {
      eventListeners.set(listener, this.#normalizeEventListener(listener))
    }

    return eventListeners.get(listener)!
  }

  /**
   * Register a global error handler
   */
  onError(
    callback: (event: keyof EventsList | Constructor<any>, error: any, data: any) => void
  ): this {
    this.#errorHandler = callback
    return this
  }

  /**
   * Listen for an event. The method returns the unsubscribe function.
   */
  on<Event extends Constructor<any>, ListenerClass extends Constructor<any>>(
    event: Event,
    listener: Listener<InstanceType<Event>, ListenerClass>
  ): UnsubscribeFunction
  on<Name extends keyof EventsList, ListenerClass extends Constructor<any>>(
    event: Name,
    listener: Listener<EventsList[Name], ListenerClass>
  ): UnsubscribeFunction
  on<Event extends AllowedEventTypes>(
    event: Event,
    listener: Listener<any, Constructor<any>>
  ): UnsubscribeFunction {
    if (debug.enabled) {
      debug('registering event listener, event: %O, listener: %O', event, listener)
    }

    const normalizedEvent = this.#resolveEvent(event)
    const normalizedListener = this.#resolveEventListener(event, listener)

    this.#transport.on(normalizedEvent, normalizedListener)
    return () => this.off(event, listener)
  }

  /**
   * Listen for an event only once
   */
  once<Event extends Constructor<any>, ListenerClass extends Constructor<any>>(
    event: Event,
    listener: Listener<InstanceType<Event>, ListenerClass>
  ): void
  once<Name extends keyof EventsList, ListenerClass extends Constructor<any>>(
    event: Name,
    listener: Listener<EventsList[Name], ListenerClass>
  ): void
  once<Event extends AllowedEventTypes>(
    event: Event,
    listener: Listener<any, Constructor<any>>
  ): void {
    if (debug.enabled) {
      debug('registering one time event listener, event: %O, listener: %O', event, listener)
    }

    const normalizedEvent = this.#resolveEvent(event)
    const normalizedListener = this.#normalizeEventListener(listener)

    /**
     * Listening for an event and unsubscribing right after the event is emitted.
     * Internally emittery does the same thing, but they do not await the
     * handler. Therefore, the "once" listeners will finish after the
     * "emit" call. This behavior is not inline with the "on" event
     * listeners.
     */
    const off = this.#transport.on(normalizedEvent, async (data) => {
      off()
      debug('removing one time event listener, event: %O', event)
      await normalizedListener(data)
    })
  }

  /**
   * Attach a listener to listen for all the events. Wildcard listeners
   * can only be defined as inline callbacks.
   */
  onAny(
    listener: (event: AllowedEventTypes, data: any) => any | Promise<any>
  ): UnsubscribeFunction {
    return this.#transport.onAny(listener)
  }

  /**
   * Emit event. The event listeners will be called asynchronously
   * in parallel.
   *
   * You can await this method to wait for events listeners to finish
   */
  async emit<Event extends Constructor<any>>(event: Event, data: InstanceType<Event>): Promise<void>
  async emit<Name extends keyof EventsList>(event: Name, data: EventsList[Name]): Promise<void>
  async emit<Event extends AllowedEventTypes>(event: Event, data: any): Promise<void> {
    /**
     * Entertain fakes if exists
     */
    if (this.#eventsToFake.has(event) || this.#eventsToFake.has('*')) {
      debug('faking emit. event: %O, data: %O', event, data)
      this.#eventsBuffer!.add(event, data)
      return
    }

    try {
      const normalizedEvent = this.#resolveEvent(event)
      await this.#transport.emit(normalizedEvent, data)
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
  off(event: keyof EventsList | Constructor<any>, listener: Listener<any, Constructor<any>>): void {
    if (debug.enabled) {
      debug('removing listener, event: %O, listener: %O', event, listener)
    }

    const normalizedEvent = this.#resolveEvent(event)
    const listeners = this.#getEventListeners(event)
    const normalizedListener = listeners.get(listener)

    if (!normalizedListener) {
      return
    }

    listeners.delete(listener)
    this.#transport.off(normalizedEvent, normalizedListener)
  }

  /**
   * Remove a specific listener listening for all the events
   */
  offAny(
    listener: (event: keyof EventsList | Constructor<any>, data: any) => any | Promise<any>
  ): this {
    this.#transport.offAny(listener)
    return this
  }

  /**
   * Remove a specific listener for an event
   *
   * @alias "off"
   */
  clearListener(
    event: keyof EventsList | Constructor<any>,
    listener: Listener<any, Constructor<any>>
  ): void {
    return this.off(event, listener)
  }

  /**
   * Clear all listeners for a specific event
   */
  clearListeners(event: keyof EventsList | Constructor<any>) {
    debug('clearing all listeners for event %O', event)
    this.#transport.clearListeners(this.#resolveEvent(event))
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
  listenerCount(event?: keyof EventsList | Constructor<any>): number {
    return this.#transport.listenerCount(event ? this.#resolveEvent(event) : undefined)
  }

  /**
   * Find if an event has one or more listeners
   */
  hasListeners(event?: keyof EventsList | Constructor<any>): boolean {
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
  fake(events?: (keyof EventsList | Constructor<any>)[]): EventsBuffer<EventsList> {
    this.restore()
    this.#eventsBuffer = new EventsBuffer<EventsList>()

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
