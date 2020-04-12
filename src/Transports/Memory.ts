/*
* @adonisjs/events
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/// <reference path="../../adonis-typings/events.ts" />

import { EmitterTransportContract, EventHandler, AnyHandler } from '@ioc:Adonis/Core/Event'

/**
 * Memory transparent adheres to the [[EmitterTransportContract]] to keep
 * emitted events with memory, that can be used later for tests assertions.
 */
export class MemoryTransport implements EmitterTransportContract {
  public events: { event: string, data: any }[] = []

  public async emit (event: string, data: any) {
    this.events.push({ event, data })
  }

  public on (_: string, __: EventHandler): void {
  }

  public async once (_: string): Promise<void> {
  }

  public onAny (__: AnyHandler): void {
  }

  public _off (_: string, __: EventHandler): void {
  }

  public offAny (__: AnyHandler): void {
  }

  public off (_: string, __: EventHandler): void {
  }

  public clearListeners (_: string): void {
  }

  public listenerCount (_: string): number {
    return 0
  }
}
