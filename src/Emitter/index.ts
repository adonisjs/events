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

import * as Emittery from 'emittery'
import { IocResolver } from '../IocResolver'

import {
  AnyHandler,
  EventHandler,
  EmitterContract,
  EmitterTransportContract,
} from '../contracts'

/**
 * Emitter class exposes the API for async event emitter built on top of
 * Emittery. It also exposes an API to pre-define the Typescript types
 * for different events.
 */
export class Emitter<T extends any = any> implements EmitterContract<T> {
  public transport: EmitterTransportContract = new Emittery()
  private _iocResolver = new IocResolver()

  /**
   * Define event handler for a given event
   */
  public on<K extends keyof T> (event: K, handler: EventHandler<T[K]> | string): this
  public on<K extends string> (event: K, handler: EventHandler<T[K]> | string): this
  public on<K extends keyof T | string> (event: K, handler: EventHandler<T[K]> | string): this {
    if (typeof (handler) === 'string') {
      handler = this._iocResolver.getEventHandler(event as string, handler)
    }

    this.transport.on(event as string, handler)
    return this
  }

  /**
   * Define event handler for a given event and to be called
   * only once.
   */
  public once<K extends keyof T> (event: K, handler: EventHandler<T[K]> | string): this
  public once<K extends string> (event: K, handler: EventHandler<T[K]> | string): this
  public once<K extends keyof T | string> (event: K, handler: EventHandler<T[K]> | string): this {
    this.transport.once(event as string).then((data) => {
      if (typeof (handler) === 'string') {
        this._iocResolver.getEventHandler(event as string, handler)(data)
        this._iocResolver.removeEventHandler(event as string, handler)
      } else {
        handler(data)
      }
    })
    return this
  }

  /**
   * Define catch all event handler to listen for all events.
   */
  public onAny (handler: AnyHandler | string): this {
    if (typeof (handler) === 'string') {
      handler = this._iocResolver.getAnyHandler(handler)
    }

    this.transport.onAny(handler)
    return this
  }

  /**
   * Emit event
   */
  public emit<K extends keyof T> (event: K, data: T[K]): Promise<void>
  public emit<K extends string> (event: K, data: T[K]): Promise<void>
  public emit<K extends keyof T | string> (event: K, data: T[K]) {
    return this.transport.emit(event as string, data)
  }

  /**
   * Remove existing event listener
   */
  public off<K extends keyof T> (event: K, handler: EventHandler | string): void
  public off<K extends string> (event: K, handler: EventHandler | string): void
  public off<K extends keyof T | string> (event: K, handler: EventHandler | string): void {
    if (typeof (handler) === 'string') {
      const offHandler = this._iocResolver.removeEventHandler(event as string, handler)
      if (offHandler) {
        this.transport.off(event as string, offHandler)
      }
      return
    }

    this.transport.off(event as string, handler)
  }

  /**
   * Remove existing event listener for catch all handler
   */
  public offAny (handler: AnyHandler | string): void {
    if (typeof (handler) === 'string') {
      const offHandler = this._iocResolver.removeAnyHandler(handler)
      if (offHandler) {
        this.transport.offAny(offHandler)
      }
      return
    }

    this.transport.offAny(handler)
  }

  /**
   * Remove existing event listener.
   * @alias off
   */
  public clearListener<K extends keyof T> (event: K, handler: EventHandler | string): void
  public clearListener<K extends string> (event: K, handler: EventHandler | string): void
  public clearListener<K extends keyof T | string> (event: K, handler: EventHandler | string): void {
    this.off(event, handler)
  }

  /**
   * Clear all listeners for a given event
   */
  public clearListeners<K extends keyof T> (event: K): void
  public clearListeners<K extends string> (event: K): void
  public clearListeners<K extends keyof T | string> (event: K): void {
    this.transport.clearListeners(event as string)
  }

  /**
   * Clear all listeners for all events
   */
  public clearAllListeners (): void {
    this.transport.clearListeners()
  }

  /**
   * Returns count of listeners for a given event or all
   * events.
   */
  public listenerCount<K extends keyof T> (event?: K): number
  public listenerCount<K extends string> (event?: K): number
  public listenerCount<K extends keyof T | string> (event?: K): number {
    return this.transport.listenerCount(event ? event as string : undefined)
  }

  /**
   * Returns a boolean telling if listeners count for a given
   * event or all events is greater than 0 or not.
   */
  public hasListeners<K extends keyof T> (event?: K): boolean
  public hasListeners<K extends string> (event?: K): boolean
  public hasListeners<K extends keyof T | string> (event?: K): boolean {
    return this.listenerCount(event) > 0
  }

  /**
   * Define custom namespace for event listeners. It is set to `App/Listeners`
   * by default.
   */
  public namespace (namespace: string): this {
    this._iocResolver.namespace(namespace)
    return this
  }
}
