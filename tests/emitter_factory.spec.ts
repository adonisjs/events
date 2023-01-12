/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { AppFactory } from '@adonisjs/application/test_factories/app'

import { Emitter } from '../index.js'
import { EmitterFactory } from '../test_factories/emitter.js'

test.group('Emitter factory', () => {
  test('create emitter instance using factory', ({ assert }) => {
    const emitter = new EmitterFactory().create()
    assert.instanceOf(emitter, Emitter)
  })

  test('create emitter instance using custom app', ({ assert }) => {
    const emitter = new EmitterFactory()
      .merge({ app: new AppFactory().create(new URL('./app/', import.meta.url)) })
      .create()
    assert.instanceOf(emitter, Emitter)
  })
})
