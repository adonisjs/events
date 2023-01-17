/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Application } from '@adonisjs/application'
import { AppFactory } from '@adonisjs/application/test_factories/app'
import { Emitter } from '../src/emitter.js'

type FactoryParameters = {
  app: Application<any>
}

/**
 * Emitter factory is used to create an instance of emitter
 * for testing
 */
export class EmitterFactory {
  #parameters: Partial<FactoryParameters> = {}

  /**
   * Returns an instance of the application class
   */
  #getApp() {
    return this.#parameters.app || new AppFactory().create(new URL('./app/', import.meta.url))
  }

  /**
   * Merge factory params
   */
  merge(params: Partial<FactoryParameters>) {
    Object.assign(this.#parameters, params)
    return this
  }

  /**
   * Create emitter instance
   */
  create() {
    return new Emitter(this.#getApp())
  }
}
