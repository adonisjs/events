/*
* @poppinss/events
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { EmitterTransportContract, EventHandler } from '../contracts'

/**
 * TypedEmitter implements a subset of [[Emitter]] methods to emit
 * events only when the data satisfies pre-defined Typescript
 * types.
 */
export class TypedEmitter<Data extends any> {
  constructor (public eventName: string, protected $transport: EmitterTransportContract) {}

  /**
   * Emit data
   */
  public emit (data: Data) {
    return this.$transport.emit(this.eventName, data)
  }

  /**
   * Define event handler for the given event
   */
  public on (handler: EventHandler<Data>) {
    this.$transport.on(this.eventName, handler)
  }

  /**
   * Define event handler for the given event
   * only once.
   */
  public once (handler: EventHandler<Data>) {
    this.$transport.once(this.eventName).then(handler)
  }
}
