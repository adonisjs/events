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
export type AllowedEventTypes = string | symbol | number | Constructor<any>

/**
 * Class constructor type
 */
export type Constructor<T> = new (...args: any[]) => T

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
 * Event list item
 */
export type EventsListItem<EventsList> = {
  [Name in keyof EventsList]: EventsList[Name]
}[keyof EventsList]

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
 * The event listener defined as an inline callback, string
 * listener class reference or a lazily imported listener
 */
export type Listener<Data, ListenerClass extends Constructor<any>> =
  | ListenerFn<Data>
  | string
  | [LazyImport<ListenerClass> | ListenerClass, GetListenersMethods<ListenerClass, Data>?]
