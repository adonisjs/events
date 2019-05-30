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
 * Shape of Event emitter
 */
export interface EmitterContract<T extends any = any> {
  transport: EmitterTransportContract
  namespace (namespace: string): this

  on<K extends keyof T> (event: K, handler: EventHandler<T[K]> | string): this
  on<K extends string> (event: K, handler: EventHandler<T[K]> | string): this
  on<K extends keyof T | string> (event: K, handler: EventHandler<T[K]> | string): this

  once<K extends keyof T> (event: K, handler: EventHandler<T[K]> | string): this
  once<K extends string> (event: K, handler: EventHandler<T[K]> | string): this
  once<K extends keyof T | string> (event: K, handler: EventHandler<T[K]> | string): this

  onAny (handler: AnyHandler): this

  emit<K extends keyof T> (event: K, data: T[K]): Promise<void>
  emit<K extends string> (event: K, data: T[K]): Promise<void>
  emit<K extends keyof T | string> (event: K, data: T[K]): Promise<void>

  off<K extends keyof T> (event: K, handler: EventHandler | string): void
  off<K extends string> (event: K, handler: EventHandler | string): void
  off<K extends keyof T | string> (event: K, handler: EventHandler | string): void

  offAny (handler: AnyHandler): void

  clearListener<K extends keyof T> (event: K, handler: EventHandler | string): void
  clearListener<K extends string> (event: K, handler: EventHandler | string): void
  clearListener<K extends keyof T | string> (event: K, handler: EventHandler | string): void

  clearListeners<K extends keyof T> (event: K): void
  clearListeners<K extends string> (event: K): void
  clearListeners<K extends keyof T | string> (event: K): void

  listenerCount<K extends keyof T> (event?: K): number
  listenerCount<K extends string> (event?: K): number
  listenerCount<K extends keyof T | string> (event?: K): number

  hasListeners<K extends keyof T> (event?: K): boolean
  hasListeners<K extends string> (event?: K): boolean
  hasListeners<K extends keyof T | string> (event?: K): boolean
}
