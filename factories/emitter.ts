/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Application } from '@adonisjs/application'
import { Emitter } from '../src/emitter.js'

/**
 * Emitter factory is used to create an instance of emitter
 * for testing
 */
export class EmitterFactory {
  /**
   * Create emitter instance
   */
  create(app: Application<any>) {
    return new Emitter(app)
  }
}
