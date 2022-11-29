/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Emittery from 'emittery'
import type { EventsListItem } from './types.js'
import { EventsBuffer } from './events_buffer.js'

import { type Application } from '@adonisjs/application'
import { type Container, moduleExpression } from '@adonisjs/fold'

/**
 * Event emitter is built on top of emittery with support for defining
 * event listeners as string expressions.
 */
export class Emitter<EventsList extends Record<string | symbol | number, any>> {
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
   * A map with module expression string and a callable function that
   * internally imports the module and calls the relevant listener
   * method.
   */
  #moduleListeners: Map<string, (data: any) => any | Promise<any>> = new Map()

  /**
   * Reference to AdonisJS application, we need the application root
   * and container reference from it.
   */
  #app: Application

  constructor(app: Application) {
    this.#app = app
  }

  /**
   * Create callable function for a given module expression
   */
  #createModuleListener(importExpression: string) {
    return moduleExpression(importExpression, this.#app.appRoot).toCallable<Container<any>, [any]>(
      this.#app.container
    )
  }

  /**
   * Returns the listener function for a given import expression. We cache
   * the listener functions to ensure that a give import expression leads
   * to a single event listener only.
   */
  #getSetModuleListener(importExpression: string) {
    if (!this.#moduleListeners.has(importExpression)) {
      this.#moduleListeners.set(importExpression, this.#createModuleListener(importExpression))
    }

    return this.#moduleListeners.get(importExpression)!
  }

  /**
   * Register a global error handler
   */
  onError(callback: (event: keyof EventsList, error: any, data: any) => void): this {
    this.#errorHandler = callback
    return this
  }

  /**
   * Listen for an event
   */
  on<Name extends keyof EventsList>(
    event: Name,
    handler: string | ((data: EventsList[Name]) => any | Promise<any>)
  ): this {
    if (typeof handler === 'string') {
      this.#transport.on(event, this.#getSetModuleListener(handler))
      return this
    }

    this.#transport.on(event, handler)
    return this
  }

  /**
   * Listen for an event only once
   */
  once<Name extends keyof EventsList>(
    event: Name,
    handler: string | ((data: EventsList[Name]) => any | Promise<any>)
  ): this {
    if (typeof handler === 'string') {
      const off = this.#transport.on(event, async (data) => {
        off()
        await this.#createModuleListener(handler)(data)
      })
      return this
    }

    /**
     * Internally emittery does the same thing, but they do not await the
     * handler, therefore the `once` events listeners can finish
     * after "await emitter.emit" call as well.
     */
    const off = this.#transport.on(event, async (data) => {
      off()
      await handler(data)
    })

    return this
  }

  /**
   * Attach a listener to listen for all the events
   */
  onAny(
    handler:
      | string
      | ((event: keyof EventsList, data: EventsListItem<EventsList>) => any | Promise<any>)
  ): this {
    if (typeof handler === 'string') {
      this.#transport.onAny(this.#getSetModuleListener(handler))
      return this
    }

    this.#transport.onAny(handler)
    return this
  }

  /**
   * Emit event. The event listeners will be called asynchronously
   * in parallel.
   *
   * You can await this method to wait for events listeners to finish
   */
  async emit<Name extends keyof EventsList>(event: Name, data: EventsList[Name]): Promise<void> {
    if (this.#eventsToFake.has(event) || this.#eventsToFake.has('*')) {
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
  off<Name extends keyof EventsList>(
    event: Name,
    handler: string | ((data: EventsList[Name]) => any | Promise<any>)
  ): this {
    if (typeof handler === 'string') {
      if (this.#moduleListeners.has(handler)) {
        this.#transport.off(event, this.#moduleListeners.get(handler)!)
      }
      return this
    }

    this.#transport.off(event, handler)
    return this
  }

  /**
   * Remove a specific listener listing for all
   * the events
   */
  offAny(
    handler:
      | string
      | ((event: keyof EventsList, data: EventsListItem<EventsList>) => any | Promise<any>)
  ): this {
    if (typeof handler === 'string') {
      if (this.#moduleListeners.has(handler)) {
        this.#transport.offAny(this.#moduleListeners.get(handler)!)
      }
      return this
    }

    this.#transport.offAny(handler)
    return this
  }

  /**
   * Remove a specific listener for an event
   *
   * @alias "off"
   */
  clearListener<Name extends keyof EventsList>(
    event: Name,
    handler: string | ((data: EventsList[Name]) => any | Promise<any>)
  ): this {
    return this.off(event, handler)
  }

  /**
   * Clear all listeners for a specific event
   */
  clearListeners(event: keyof EventsList) {
    this.#transport.clearListeners(event)
  }

  /**
   * Clear all listeners for all the events
   */
  clearAllListeners() {
    this.#transport.clearListeners()
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
      this.#eventsToFake.add('*')
    } else {
      events.forEach((event) => this.#eventsToFake.add(event))
    }

    return this.#eventsBuffer
  }

  /**
   * Restore fakes
   */
  restore() {
    this.#eventsToFake.clear()
    this.#eventsBuffer?.flush()
    this.#eventsBuffer = undefined
  }
}
