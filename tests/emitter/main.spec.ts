/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Emitter } from '../../src/emitter.js'
import { Application } from '@adonisjs/application'

const BASE_URL = new URL('./app/', import.meta.url)

test.group('Emitter', () => {
  test('find if there are listeners for a specific event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.on('new:user', () => {})

    assert.isTrue(emitter.hasListeners('new:user'))
    assert.isFalse(emitter.hasListeners('resend:email'))

    assert.deepEqual(new Array(...emitter.eventsListeners.keys()), ['new:user'])
  })

  test('find if there are listeners for any event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.on('new:user', () => {})

    assert.isTrue(emitter.hasListeners())
    assert.deepEqual(emitter.eventsListeners.size, 1)
  })

  test('get count of listeners for a specific event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.on('new:user', () => {})

    assert.equal(emitter.listenerCount('new:user'), 1)
    assert.equal(emitter.listenerCount('resend:email'), 0)
    assert.deepEqual(emitter.eventsListeners.get('new:user')?.size, 1)
  })

  test('get count of listeners for any event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.on('new:user', () => {})
    emitter.on('resend:email', () => {})

    assert.equal(emitter.listenerCount(), 2)
    assert.deepEqual(emitter.eventsListeners.size, 2)
  })

  test('remove all listeners for a specific events', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    function sendEmail() {}

    emitter.on('new:user', () => {})
    emitter.on('resend:email', () => {})
    emitter.on('resend:email', sendEmail)

    assert.equal(emitter.listenerCount(), 3)
    assert.deepEqual(emitter.eventsListeners.size, 2)
    assert.deepEqual(emitter.eventsListeners.get('new:user')?.size, 1)
    assert.deepEqual(emitter.eventsListeners.get('resend:email')?.size, 2)

    emitter.clearListeners('resend:email')
    assert.equal(emitter.listenerCount(), 1)
    assert.deepEqual(emitter.eventsListeners.size, 1)
    assert.deepEqual(emitter.eventsListeners.get('new:user')?.size, 1)
    assert.isUndefined(emitter.eventsListeners.get('resend:email'))
  })

  test('remove all listeners for all events', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    function sendEmail() {}

    emitter.on('new:user', () => {})
    emitter.on('resend:email', () => {})
    emitter.on('resend:email', sendEmail)
    assert.equal(emitter.listenerCount(), 3)

    emitter.clearAllListeners()
    assert.equal(emitter.listenerCount(), 0)
    assert.deepEqual(emitter.eventsListeners.size, 0)
  })
})
