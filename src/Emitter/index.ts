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
import { TypedEmitter } from './TypedEmitter'
import { AnyHandler, EventHandler, EmitterContract, EmitterTransportContract } from '../contracts'

/**
 * Emitter class exposes the API for async event emitter built on top of
 * Emittery. It also exposes an API to pre-define the Typescript types
 * for different events.
 */
export class Emitter<EventsMap extends any = any> implements EmitterContract<EventsMap> {
  public transport: EmitterTransportContract = new Emittery()

  /**
   * Returns instance of a typed emitter. Make sure the event name
   * is already pre-defined inside `EventsMap` type.
   */
  public for<EventName extends keyof EventsMap> (event: EventName): TypedEmitter<EventsMap[EventName]> {
    return new TypedEmitter(event as string, this.transport)
  }

  /**
   * Define event handler for a given event
   */
  public on (event: string, handler: EventHandler): this {
    this.transport.on(event, handler)
    return this
  }

  /**
   * Define event handler for a given event and to be called
   * only once.
   */
  public once (event: string, handler: EventHandler): this {
    this.transport.once(event).then(handler)
    return this
  }

  /**
   * Define catch all event handler to listen for all events.
   */
  public onAny (handler: AnyHandler): this {
    this.transport.onAny(handler)
    return this
  }

  /**
   * Emit event
   */
  public emit (event: string, data: any) {
    return this.transport.emit(event, data)
  }

  /**
   * Remove existing event listener
   */
  public off (event: string, handler: EventHandler): void {
    this.transport.off(event, handler)
  }

  /**
   * Remove existing event listener for catch all handler
   */
  public offAny (handler: AnyHandler): void {
    this.transport.offAny(handler)
  }

  /**
   * Remove existing event listener.
   * @alias off
   */
  public clearListener (event: string, handler: EventHandler): void {
    this.off(event, handler)
  }

  /**
   * Clear all listeners for a given event
   */
  public clearListeners (event: string): void {
    this.transport.clearListeners(event)
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
  public listenerCount (event?: string): number {
    return this.transport.listenerCount(event)
  }

  /**
   * Returns a boolean telling if listeners count for a given
   * event or all events is greater than 0 or not.
   */
  public hasListeners (event?: string): boolean {
    return this.transport.listenerCount(event) > 0
  }
}
