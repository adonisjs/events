/**
 * @module @adonisjs/events
 */

/*
* @adonisjs/events
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { IocContract } from '@adonisjs/fold'
import { Emitter } from '../src/Emitter'

export default class Event {
  constructor (protected $container: IocContract) {}

  /**
   * Register `Event emitter` to the container.
   */
  protected $registerEmitter () {
    this.$container.singleton('Adonis/Core/Event', () => {
      return new Emitter()
    })
  }
}
