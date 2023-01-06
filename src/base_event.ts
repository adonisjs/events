/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Emitter } from './emitter.js'

/**
 * Base event adds ability to a class to act as an event. You can emit the
 * event by calling "Event.dispatch" method.
 */
export class BaseEvent {
  constructor(..._: any[]) {}

  /**
   * The emitter to use for dispatching events
   */
  static emitter: Emitter<any>

  /**
   * Specify the emitter instance to use for dispatching events
   */
  static useEmitter(emitter: Emitter<any>) {
    this.emitter = emitter
  }

  /**
   * Dispatch the current class as an event. The method takes the arguments
   * accepted by the class constructor.
   */
  static dispatch<T extends typeof BaseEvent>(this: T, ...args: ConstructorParameters<T>) {
    return this.emitter.emit<T>(this, new this(...args) as InstanceType<T>)
  }
}
