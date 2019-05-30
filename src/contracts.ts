/**
 * @module @poppinss/events
 */

/*
* @poppinss/events
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Shape of event handler
 */
export type EventHandler<T extends any = any> = ((data: T) => Promise<void> | void)

/**
 * Shape of catch all events handler
 */
export type AnyHandler<T extends any = any> = ((event: string, data: T) => Promise<void> | void)

/**
 * The shape of emitter transport. This has to be same as
 * `emittery`.
 */
export interface EmitterTransportContract {
  on (event: string, handler: EventHandler): void
  once (event: string): Promise<any>
  onAny (handler: AnyHandler): void
  emit (event: string, data: any): Promise<void>
  off (event: string, handler: EventHandler): void
  offAny (handler: AnyHandler): void
  off (event: string, handler: EventHandler): void
  clearListeners (event?: string): void
  listenerCount (event?: string): number
}

/**
 * Typed emitter ensure that the emitted and consumed data
 * adheres to a type
 */
export interface TypedEmitterContract<Data extends any> {
  eventName: string,
  emit (data: Data): Promise<void>
  on (handler: EventHandler): void
  once (handler: EventHandler): void
}

/**
 * Shape of Event emitter
 */
export interface EmitterContract<EventsMap extends any = any> {
  transport: EmitterTransportContract

  for<EventName extends keyof EventsMap> (event: EventName): TypedEmitterContract<EventsMap[EventName]>

  on (event: string, handler: EventHandler): this
  once (event: string, handler: EventHandler): this
  onAny (handler: AnyHandler): this

  emit (event: string, data: any): Promise<void>

  off (event: string, handler: EventHandler): void
  offAny (handler: AnyHandler): void
  clearListener (event: string, handler: EventHandler): void
  clearListeners (event: string): void

  listenerCount (event: string): number
  hasListeners (event: string): boolean
}
