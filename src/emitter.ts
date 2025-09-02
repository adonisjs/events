/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import is from '@sindresorhus/is'
import type { Application } from '@adonisjs/application'
import Emittery, { type UnsubscribeFunction } from 'emittery'
import { moduleCaller, moduleImporter } from '@adonisjs/fold'
import { type LazyImport, type Constructor } from '@poppinss/utils/types'

import debug from './debug.ts'
import { EventsBuffer } from './events_buffer.ts'
import type {
  Listener,
  EmitterLike,
  ListenerMethod,
  AllowedEventTypes,
  ListenerClassWithHandleMethod,
} from './types.ts'
import { eventDispatch } from './tracing_channels.ts'

/**
 * Event emitter is built on top of emittery with support class based
 * events and listeners
 */
export class Emitter<EventsList extends Record<string | symbol | number, any>>
  implements EmitterLike<EventsList>
{
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
  #app: Application<any>

  /**
   * Returns a map of events and their registered listeners. The
   * map key is the event name and the value is another map
   * of listeners.
   *
   * The listeners map key is the original binding listener
   * and the value is a callback function.
   *
   * @returns The events listeners map
   */
  get eventsListeners(): Map<
    AllowedEventTypes,
    Map<Listener<any, Constructor<any>>, ListenerMethod<any>>
  > {
    return this.#eventsListeners
  }

  /**
   * Creates a new Emitter instance
   *
   * @param app - The AdonisJS application instance
   */
  constructor(app: Application<any>) {
    this.#app = app
  }

  /**
   * Check if the value is a constructor and narrow down its types
   *
   * @param value - The value to check
   * @returns True if the value is a constructor
   */
  #isConstructor(value: unknown): value is Constructor<any> {
    return is.class(value)
  }

  /**
   * Returns the symbol for a class based event.
   *
   * @param event - The event class constructor
   * @returns The symbol for the event class
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
   *
   * @param event - The event to resolve
   * @returns The resolved event as string, symbol, or number
   */
  #resolveEvent(event: AllowedEventTypes): string | symbol | number {
    if (this.#isConstructor(event)) {
      return this.#getEventClassSymbol(event)
    }

    return event
  }

  /**
   * Returns the event listeners map
   *
   * @param event - The event to get listeners for
   * @returns The listeners map for the event
   */
  #getEventListeners(
    event: AllowedEventTypes
  ): Map<Listener<any, Constructor<any>>, ListenerMethod<any>> {
    if (!this.#eventsListeners.has(event)) {
      this.#eventsListeners.set(event, new Map())
    }

    return this.#eventsListeners.get(event)!
  }

  /**
   * Normalizes the event listener to a function that can be passed to
   * emittery.
   *
   * @param listener - The listener to normalize
   * @returns The normalized listener method
   */
  #normalizeEventListener(listener: Listener<any, Constructor<any>>): ListenerMethod<any> {
    /**
     * Parse string based listener
     */
    if (typeof listener === 'string') {
      const parts = listener.split('.')
      const method = parts.length === 1 ? 'handle' : parts.pop()!
      const moduleRefId = parts.join('.')
      return moduleImporter(() => this.#app.import(moduleRefId), method).toCallable(
        this.#app.container
      )
    }

    /**
     * Parse array based listener with the listener reference
     * or lazily imported listener class
     */
    if (Array.isArray(listener)) {
      const listenerModule = listener[0]
      const method = listener[1] || 'handle'

      /**
       * Class reference
       */
      if (this.#isConstructor(listenerModule)) {
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
   *
   * @param event - The event to resolve listener for
   * @param listener - The listener to resolve
   * @returns The resolved listener method
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
   *
   * @param callback - The error handler callback
   * @returns The emitter instance for method chaining
   */
  onError(
    callback: (event: keyof EventsList | Constructor<any>, error: any, data: any) => void
  ): this {
    this.#errorHandler = callback
    return this
  }

  /**
   * Bind multiple listeners to listen for a single event. The listen
   * method is a convenience helper to be used with class based
   * events and listeners.
   *
   * @param event - The event class to listen for
   * @param listeners - Array of listener classes with handle methods
   */
  listen<Event extends Constructor<any>>(
    event: Event,
    listeners: (
      | ListenerClassWithHandleMethod<InstanceType<Event>>
      | LazyImport<ListenerClassWithHandleMethod<InstanceType<Event>>>
    )[]
  ): void {
    listeners.forEach((listener) => this.on(event, [listener, 'handle']))
  }

  /**
   * Listen for an event. The method returns the unsubscribe function.
   *
   * @param event - The event to listen for
   * @param listener - The listener to register
   * @returns The unsubscribe function
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
   * Listen for an event depending on a condition
   *
   * @param condition - The condition to check before listening
   * @param event - The event to listen for
   * @param listener - The listener to register
   * @returns The unsubscribe function
   */
  listenIf<Event extends Constructor<any>, ListenerClass extends Constructor<any>>(
    condition: boolean | (() => boolean),
    event: Event,
    listener: Listener<InstanceType<Event>, ListenerClass>
  ): UnsubscribeFunction
  listenIf<Name extends keyof EventsList, ListenerClass extends Constructor<any>>(
    condition: boolean | (() => boolean),
    event: Name,
    listener: Listener<EventsList[Name], ListenerClass>
  ): UnsubscribeFunction
  listenIf<Event extends AllowedEventTypes>(
    condition: boolean | (() => boolean),
    event: Event,
    listener: Listener<any, Constructor<any>>
  ): UnsubscribeFunction {
    if (!condition || (typeof condition === 'function' && !condition())) {
      return () => {}
    }

    // @ts-expect-error - TypeScript does not like overloading
    return this.on(event, listener)
  }

  /**
   * Listen for an event only once
   *
   * @param event - The event to listen for
   * @param listener - The listener to register
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
   *
   * @param listener - The wildcard listener callback
   * @returns The unsubscribe function
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
   *
   * @param event - The event to emit
   * @param data - The data to pass to listeners
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
      await eventDispatch.tracePromise(
        this.#transport.emit,
        eventDispatch.hasSubscribers
          ? {
              event,
              data,
            }
          : undefined,
        this.#transport,
        normalizedEvent,
        data
      )
    } catch (error) {
      if (this.#errorHandler) {
        this.#errorHandler(event, error, data)
      } else {
        throw error
      }
    }
  }

  /**
   * Emit events serially. The event listeners will be called asynchronously
   * in the same sequence as they are registered.
   *
   * You can await this method to wait for events listeners to finish
   *
   * @param event - The event to emit
   * @param data - The data to pass to listeners
   */
  async emitSerial<Event extends Constructor<any>>(
    event: Event,
    data: InstanceType<Event>
  ): Promise<void>
  async emitSerial<Name extends keyof EventsList>(
    event: Name,
    data: EventsList[Name]
  ): Promise<void>
  async emitSerial<Event extends AllowedEventTypes>(event: Event, data: any): Promise<void> {
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
      await eventDispatch.tracePromise(
        this.#transport.emitSerial,
        eventDispatch.hasSubscribers
          ? {
              event,
              data,
            }
          : undefined,
        this.#transport,
        normalizedEvent,
        data
      )
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
   *
   * @param event - The event to remove listener from
   * @param listener - The listener to remove
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
   *
   * @param listener - The wildcard listener to remove
   * @returns The emitter instance for method chaining
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
   * @param event - The event to remove listener from
   * @param listener - The listener to remove
   */
  clearListener(
    event: keyof EventsList | Constructor<any>,
    listener: Listener<any, Constructor<any>>
  ): void {
    return this.off(event, listener)
  }

  /**
   * Clear all listeners for a specific event
   *
   * @param event - The event to clear listeners for
   */
  clearListeners(event: keyof EventsList | Constructor<any>): void {
    debug('clearing all listeners for event %O', event)
    this.#transport.clearListeners(this.#resolveEvent(event))
    this.#eventsListeners.delete(event)
  }

  /**
   * Clear all listeners for all the events
   */
  clearAllListeners(): void {
    debug('clearing all event listeners')
    this.#transport.clearListeners()
    this.#eventsListeners.clear()
  }

  /**
   * Get count of listeners for a given event or all the events
   *
   * @param event - The event to count listeners for (optional)
   * @returns The number of listeners
   */
  listenerCount(event?: keyof EventsList | Constructor<any>): number {
    return this.#transport.listenerCount(event ? this.#resolveEvent(event) : undefined)
  }

  /**
   * Find if an event has one or more listeners
   *
   * @param event - The event to check listeners for (optional)
   * @returns True if the event has listeners
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
   *
   * @param events - Array of events to fake (optional, defaults to all events)
   * @returns The events buffer for assertions
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
  restore(): void {
    debug('restoring existing fakes')
    this.#eventsToFake.clear()
    this.#eventsBuffer?.flush()
    this.#eventsBuffer = undefined
  }
}
