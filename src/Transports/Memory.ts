/*
* @poppinss/events
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { EmitterTransportContract, EventHandler, AnyHandler } from '../contracts'

/**
 * Memory transparent adheres to the [[EmitterTransportContract]] to keep
 * emitted events with memory, that can be used later for tests assertions.
 */
export class MemoryTransport implements EmitterTransportContract {
  public events: { event: string, data: any }[] = []

  public async emit (event: string, data: any) {
    this.events.push({ event, data })
  }

  public on (_event: string, _handler: EventHandler): void {
  }

  public async once (_event: string): Promise<void> {
  }

  public onAny (_handler: AnyHandler): void {
  }

  public _off (_event: string, _handler: EventHandler): void {
  }

  public offAny (_handler: AnyHandler): void {
  }

  public off (_event: string, _handler: EventHandler): void {
  }

  public clearListeners (_event: string): void {
  }

  public listenerCount (_event: string): number {
    return 0
  }
}
