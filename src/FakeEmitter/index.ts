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

import { Emitter } from '../Emitter'
import { MemoryTransport } from '../Transports/Memory'

/**
 * Fake emitter with memory transport to be used
 * during testing.
 */
export class FakeEmitter<T extends any> extends Emitter<T> {
  public transport = new MemoryTransport()

  /**
   * Returns in memory events from transport
   */
  public get events () {
    return this.transport.events
  }

  /**
   * Clear in memory events
   */
  public clear () {
    this.transport.events = []
  }
}
