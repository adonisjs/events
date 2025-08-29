/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { type LazyImport, type Constructor } from '@poppinss/utils/types'

/**
 * Data types for event name
 */
export type AllowedEventTypes = string | symbol | number | Constructor<any>

/**
 * Data structure for a buffered event
 *
 * @template Event - The event type
 * @template Data - The data type
 */
export type BufferedEvent<Event, Data> = { event: Event; data: Data }

/**
 * Event list item inside buffered items
 *
 * @template EventsList - The events list type
 */
export type BufferedEventsList<EventsList> =
  | { [Name in keyof EventsList]: BufferedEvent<Name, EventsList[Name]> }[keyof EventsList]
  | BufferedEvent<Constructor<any>, any>

/**
 * Representation of listener method on the listener class. The
 * spread args can type hint dependencies and container will
 * resolve them
 *
 * @template Data - The event data type
 */
export type ListenerMethod<Data> = (data: Data, ...args: any[]) => any | Promise<any>

/**
 * The event listener defined as an inline callback
 *
 * @template Data - The event data type
 */
export type ListenerFn<Data> = (data: Data) => any | Promise<any>

/**
 * Returns a union of methods from a listener that accepts
 * the event data as the first argument.
 *
 * @template Listener - The listener class constructor
 * @template Data - The event data type
 */
// eslint-disable-next-line @typescript-eslint/no-shadow
export type GetListenersMethods<Listener extends Constructor<any>, Data> = {
  [K in keyof InstanceType<Listener>]: InstanceType<Listener>[K] extends ListenerMethod<Data>
    ? K
    : never
}[keyof InstanceType<Listener>]

/**
 * Representation of listener class with handle method
 *
 * @template Data - The event data type
 */
export type ListenerClassWithHandleMethod<Data> = Constructor<{ handle: ListenerMethod<Data> }>

/**
 * The event listener defined as an inline callback, string
 * listener class reference or a lazily imported listener
 *
 * @template Data - The event data type
 * @template ListenerClass - The listener class constructor
 */
export type Listener<Data, ListenerClass extends Constructor<any>> =
  | ListenerFn<Data>
  | string
  | [LazyImport<ListenerClass> | ListenerClass, GetListenersMethods<ListenerClass, Data>?]

/**
 * The EmitterLike interface exposes a less strict API to accept
 * emitter as an argument to emit events.
 *
 * @template EventsList - The events list type
 */
export interface EmitterLike<EventsList extends Record<string | symbol | number, any>> {
  /**
   * Emit event. The event listeners will be called asynchronously
   * in parallel.
   *
   * You can await this method to wait for events listeners to finish
   *
   * @param event - The event to emit
   * @param data - The data to pass to listeners
   * @returns Promise that resolves when all listeners finish
   */
  emit<Event extends Constructor<any>>(event: Event, data: InstanceType<Event>): Promise<void>
  emit<Name extends keyof EventsList>(event: Name, data: EventsList[Name]): Promise<void>

  /**
   * Emit events serially. The event listeners will be called asynchronously
   * in the same sequence as they are registered.
   *
   * You can await this method to wait for events listeners to finish
   *
   * @param event - The event to emit
   * @param data - The data to pass to listeners
   * @returns Promise that resolves when all listeners finish
   */
  emitSerial<Event extends Constructor<any>>(event: Event, data: InstanceType<Event>): Promise<void>
  emitSerial<Name extends keyof EventsList>(event: Name, data: EventsList[Name]): Promise<void>

  /**
   * Get count of listeners for a given event or all the events
   *
   * @param event - The event to count listeners for (optional)
   * @returns The number of listeners
   */
  listenerCount(event?: keyof EventsList | Constructor<any>): number

  /**
   * Find if an event has one or more listeners
   *
   * @param event - The event to check listeners for (optional)
   * @returns True if the event has listeners
   */
  hasListeners(event?: keyof EventsList | Constructor<any>): boolean
}

/**
 * Data shared via the event.dispatch tracing channel
 */
export type EventDispatchData = {
  event: AllowedEventTypes
  data: unknown
}
