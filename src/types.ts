/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Data types for event name
 */
export type AllowedEventTypes = string | symbol | number | Constructor

/**
 * Class constructor type
 */
export type Constructor<T = unknown> = new (...args: any[]) => T

/**
 * A function that lazily imports a middleware
 */
export type LazyImport<DefaultExport> = () => Promise<{ default: DefaultExport }>

/**
 * Data structure for a buffered event
 */
export type BufferedEvent<Event, Data> = { event: Event; data: Data }

/**
 * Event list item inside bufferred items
 */
export type BufferedEventsList<EventsList> =
  | {
      [Name in keyof EventsList]: BufferedEvent<Name, EventsList[Name]>
    }[keyof EventsList]
  | BufferedEvent<Constructor<any>, any>

/**
 * Representation of listener method on the listener class. The
 * spread args can type hint dependencies and container will
 * resolve them
 */
export type ListenerMethod<Data> = (data: Data, ...args: any[]) => any | Promise<any>

/**
 * The event listener defined as an inline callback
 */
export type ListenerFn<Data> = (data: Data) => any | Promise<any>

/**
 * Returns a union of methods from a listener that accepts
 * the event data as the first argument.
 */
export type GetListenersMethods<Listener extends Constructor<any>, Data> = {
  [K in keyof InstanceType<Listener>]: InstanceType<Listener>[K] extends ListenerMethod<Data>
    ? K
    : never
}[keyof InstanceType<Listener>]

/**
 * Representation of listener class with handle method
 */
export type ListenerClassWithHandleMethod<Data> = Constructor<{
  handle: ListenerMethod<Data>
}>

/**
 * The event listener defined as an inline callback, string
 * listener class reference or a lazily imported listener
 */
export type Listener<Data, ListenerClass extends Constructor> =
  | ListenerFn<Data>
  | string
  | [LazyImport<ListenerClass> | ListenerClass, GetListenersMethods<ListenerClass, Data>?]

/**
 * The EmitterLike interface exposes a less strict API to accept
 * emitter as an argument to emit events.
 */
export interface EmitterLike<EventsList extends Record<string | symbol | number, any>> {
  /**
   * Emit event. The event listeners will be called asynchronously
   * in parallel.
   *
   * You can await this method to wait for events listeners to finish
   */
  emit<Event extends Constructor<any>>(event: Event, data: InstanceType<Event>): Promise<void>
  emit<Name extends keyof EventsList>(event: Name, data: EventsList[Name]): Promise<void>

  /**
   * Emit events serially. The event listeners will be called asynchronously
   * in the same sequence as they are registered.
   *
   * You can await this method to wait for events listeners to finish
   */
  emitSerial<Event extends Constructor<any>>(event: Event, data: InstanceType<Event>): Promise<void>
  emitSerial<Name extends keyof EventsList>(event: Name, data: EventsList[Name]): Promise<void>

  /**
   * Find if an event has one or more listeners
   */
  listenerCount(event?: keyof EventsList | Constructor<any>): number

  /**
   * Get count of listeners for a given event or all the events
   */
  hasListeners(event?: keyof EventsList | Constructor<any>): boolean
}
