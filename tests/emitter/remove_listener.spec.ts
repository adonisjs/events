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

const BASE_URL = new URL('../app/', import.meta.url)
type NewUserEvent = { id: number }

test.group('Emitter | clearListener', () => {
  test('remove callback listener', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    function listener1() {
      throw new Error('Never expected to reach here')
    }
    function listener2() {}

    emitter.on('new:user', listener1)
    emitter.on('new:user', listener2)

    assert.equal(emitter.listenerCount('new:user'), 2)
    assert.equal(emitter.eventsListeners.get('new:user')?.size, 2)

    emitter.clearListener('new:user', listener1)
    await emitter.emit('new:user', { id: 1 })

    assert.equal(emitter.listenerCount('new:user'), 1)
    assert.equal(emitter.eventsListeners.get('new:user')?.size, 1)
  })

  test('remove listener for a class based event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    function listener1() {
      throw new Error('Never expected to reach here')
    }
    function listener2() {}

    class UserRegistered {}

    emitter.on(UserRegistered, listener1)
    emitter.on(UserRegistered, listener2)

    assert.equal(emitter.listenerCount(UserRegistered), 2)
    assert.equal(emitter.eventsListeners.get(UserRegistered)?.size, 2)

    emitter.clearListener(UserRegistered, listener1)
    await emitter.emit(UserRegistered, new UserRegistered())

    assert.equal(emitter.listenerCount(UserRegistered), 1)
    assert.equal(emitter.eventsListeners.get(UserRegistered)?.size, 1)
  })

  test('remove magic string listener', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    function listener2() {}

    emitter.on('new:user', '#listeners/new_user.sendEmail')
    emitter.on('new:user', listener2)

    assert.equal(emitter.listenerCount('new:user'), 2)
    assert.equal(emitter.eventsListeners.get('new:user')?.size, 2)

    emitter.clearListener('new:user', '#listeners/new_user.sendEmail')
    await emitter.emit('new:user', { id: 1 })

    assert.equal(emitter.listenerCount('new:user'), 1)
    assert.equal(emitter.eventsListeners.get('new:user')?.size, 1)
  })

  test('remove lazy loaded listener', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)
    await app.init()

    const NewUserListener1 = async () => {
      return {
        default: class NewUser {
          sendEmail() {
            throw new Error('Never expected to reach here')
          }
        },
      }
    }
    const sendEmail1: [typeof NewUserListener1, 'sendEmail'] = [NewUserListener1, 'sendEmail']

    const NewUserListener2 = async () => {
      return {
        default: class NewUser {
          sendEmail() {}
        },
      }
    }
    const sendEmail2: [typeof NewUserListener2, 'sendEmail'] = [NewUserListener2, 'sendEmail']

    emitter.on('new:user', sendEmail1)
    emitter.on('new:user', sendEmail2)

    assert.equal(emitter.listenerCount('new:user'), 2)
    assert.equal(emitter.eventsListeners.get('new:user')?.size, 2)

    emitter.clearListener('new:user', sendEmail1)
    await emitter.emit('new:user', { id: 1 })

    assert.equal(emitter.listenerCount('new:user'), 1)
    assert.equal(emitter.eventsListeners.get('new:user')?.size, 1)
  })

  test('remove class reference listener', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)
    await app.init()

    class NewUser1 {
      sendEmail() {
        throw new Error('Never expected to reach here')
      }
    }
    const sendEmail1: [typeof NewUser1, 'sendEmail'] = [NewUser1, 'sendEmail']

    class NewUser2 {
      sendEmail() {}
    }
    const sendEmail2: [typeof NewUser2, 'sendEmail'] = [NewUser2, 'sendEmail']

    emitter.on('new:user', sendEmail1)
    emitter.on('new:user', sendEmail2)

    assert.equal(emitter.listenerCount('new:user'), 2)
    assert.equal(emitter.eventsListeners.get('new:user')?.size, 2)

    emitter.clearListener('new:user', sendEmail1)
    await emitter.emit('new:user', { id: 1 })

    assert.equal(emitter.listenerCount('new:user'), 1)
    assert.equal(emitter.eventsListeners.get('new:user')?.size, 1)
  })

  test('noop when removing unregistered listener', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    function listener1() {}
    function listener2() {}

    emitter.on('new:user', listener1)

    assert.equal(emitter.listenerCount('new:user'), 1)
    assert.equal(emitter.eventsListeners.get('new:user')?.size, 1)

    emitter.clearListener('new:user', listener2)

    assert.equal(emitter.listenerCount('new:user'), 1)
    assert.equal(emitter.eventsListeners.get('new:user')?.size, 1)
    assert.strictEqual(emitter.eventsListeners.get('new:user')?.get(listener1), listener1)
  })
})

test.group('Emitter | offAny', () => {
  test('remove any listener', async ({ assert }) => {
    const stack: any[] = []
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    function sendEmail() {}

    emitter.onAny((event, data) => {
      stack.push({ event, data })
    })
    emitter.onAny(sendEmail)

    assert.equal(emitter.listenerCount(), 2)
    emitter.offAny(sendEmail)

    assert.equal(emitter.listenerCount(), 1)
  })
})
