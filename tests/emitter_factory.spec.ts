/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Application } from '@adonisjs/application'

import { Emitter } from '../index.js'
import { EmitterFactory } from '../test_factories/emitter.js'

const BASE_URL = new URL('./app/', import.meta.url)

test.group('Emitter factory', () => {
  test('create emitter instance using factory', ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new EmitterFactory().create(app)
    assert.instanceOf(emitter, Emitter)
  })
})
