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

import {
  EmitterTransportContract,
  EventHandler,
  TypedEmitterContract,
} from '../contracts'
import { IocResolver } from '../IocResolver'

/**
 * TypedEmitter implements a subset of [[Emitter]] methods to emit
 * events only when the data satisfies pre-defined Typescript
 * types.
 */
export class TypedEmitter<Data extends any> implements TypedEmitterContract<Data> {
  constructor (
    public eventName: string,
    protected $transport: EmitterTransportContract,
    private _iocResolver: IocResolver,
  ) {}

  /**
   * Emit data
   */
  public emit (data: Data) {
    return this.$transport.emit(this.eventName, data)
  }

  /**
   * Define event handler for the given event
   */
  public on (handler: EventHandler<Data> | string) {
    if (typeof (handler) === 'string') {
      handler = this._iocResolver.getEventHandler(this.eventName, handler)
    }

    this.$transport.on(this.eventName, handler)
  }

  /**
   * Define event handler for the given event
   * only once.
   */
  public once (handler: EventHandler<Data> | string) {
    this.$transport.once(this.eventName).then((data: Data) => {
      if (typeof (handler) === 'string') {
        this._iocResolver.getEventHandler(this.eventName, handler)(data)
        this._iocResolver.removeEventHandler(this.eventName, handler)
      } else {
        handler(data)
      }
    })
  }
}
