/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { join } from 'node:path'
import { test } from '@japa/runner'
import { fileURLToPath } from 'node:url'
import { remove, outputFile } from 'fs-extra'
import { Application } from '@adonisjs/application'

import { Emitter } from '../../src/emitter.js'

const BASE_URL = new URL('../app/', import.meta.url)
const BASE_PATH = fileURLToPath(BASE_URL)

test.group('Emitter | Module listeners', (group) => {
  group.each.teardown(async () => {
    return () => remove(BASE_PATH)
  })

  test('listen for an event', async ({ assert }) => {
    await outputFile(
      join(BASE_PATH, './listeners/new_user.ts'),
      `
      export default class NewUser {
        sendEmail(data) {
          data.push('invoked')
        }
      }
    `
    )

    const state: string[] = []
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.on('new:user', '#listeners/new_user.sendEmail')
    await emitter.emit('new:user', state)

    assert.deepEqual(state, ['invoked'])
  })

  test('listen for an event only once', async ({ assert }) => {
    await outputFile(
      join(BASE_PATH, './listeners/new_user_v1.ts'),
      `
      export default class NewUser {
        sendEmail(data) {
          data.push('invoked')
        }
      }
    `
    )

    const state: string[] = []
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.once('new:user', '#listeners/new_user_v1.sendEmail')

    await emitter.emit('new:user', state)
    await emitter.emit('new:user', state)
    await emitter.emit('new:user', state)

    assert.deepEqual(state, ['invoked'])
  })

  test('raise exception when listener fails', async ({ assert }) => {
    await outputFile(
      join(BASE_PATH, './listeners/new_user_v2.ts'),
      `
      export default class NewUser {
        sendEmail() {
          throw new Error('boom')
        }
      }
    `
    )

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.on('new:user', '#listeners/new_user_v2.sendEmail')
    await assert.rejects(() => emitter.emit('new:user', []), 'boom')
  })

  test('notify error handler when a listener fails', async ({ assert, expectTypeOf }, done) => {
    await outputFile(
      join(BASE_PATH, './listeners/new_user_v3.ts'),
      `
      export default class NewUser {
        sendEmail() {
          throw new Error('boom')
        }
      }
    `
    )

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.on('new:user', '#listeners/new_user_v3.sendEmail')

    emitter.onError((event, error) => {
      expectTypeOf(event).toEqualTypeOf<'new:user'>()
      assert.equal(event, 'new:user')
      assert.equal(error.message, 'boom')
      done()
    })
    await assert.doesNotRejects(() => emitter.emit('new:user', []))
  }).waitForDone()

  test('listen for any event', async ({ assert }) => {
    await outputFile(
      join(BASE_PATH, './listeners/observer.ts'),
      `
      export default class Observer {
        handle(event, data) {
          data.push(event)
        }
      }
    `
    )

    const state: string[] = []
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[]; 'resend:email': string[] }>(app)
    await app.init()

    emitter.onAny('#listeners/observer')

    await emitter.emit('new:user', state)
    await emitter.emit('resend:email', state)
    assert.deepEqual(state, ['new:user', 'resend:email'])
  })

  test('find if there are listeners for a specific event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.on('new:user', '#listeners/new_user_v4.sendEmail')

    assert.isTrue(emitter.hasListeners('new:user'))
    // @ts-expect-error
    assert.isFalse(emitter.hasListeners('resend:email'))
  })

  test('find if there are listeners for any event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.on('new:user', '#listeners/new_user_v5.sendEmail')
    assert.isTrue(emitter.hasListeners())
  })

  test('get count of listeners for a specific event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.on('new:user', '#listeners/new_user_v6.sendEmail')

    assert.equal(emitter.listenerCount('new:user'), 1)
    // @ts-expect-error
    assert.equal(emitter.listenerCount('resend:email'), 0)
  })

  test('get count of listeners for any event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[]; 'resend:email': [] }>(app)
    await app.init()

    emitter.on('new:user', '#listeners/new_user_v6.sendEmail')
    emitter.on('resend:email', '#listeners/resend_email')

    assert.equal(emitter.listenerCount(), 2)
  })

  test('remove a specific listeners', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[]; 'resend:email': [] }>(app)
    await app.init()

    emitter.on('new:user', '#listeners/new_user_v6.sendEmail')
    emitter.on('resend:email', '#listeners/resend_email')
    assert.equal(emitter.listenerCount(), 2)

    emitter.clearListener('resend:email', '#listeners/resend_email')
    assert.equal(emitter.listenerCount(), 1)

    emitter.clearListener('new:user', '#listeners/new_user_v6.sendEmail')
    assert.equal(emitter.listenerCount(), 0)
  })

  test('remove all listeners for a specific events', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[]; 'resend:email': [] }>(app)
    await app.init()

    emitter.on('new:user', '#listeners/new_user_v6.sendEmail')
    emitter.on('resend:email', '#listeners/resend_email')

    assert.equal(emitter.listenerCount(), 2)

    emitter.clearListeners('resend:email')
    assert.equal(emitter.listenerCount(), 1)
  })

  test('remove all listeners for all events', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[]; 'resend:email': [] }>(app)
    await app.init()

    emitter.on('new:user', '#listeners/new_user_v6.sendEmail')
    emitter.on('resend:email', '#listeners/resend_email')

    assert.equal(emitter.listenerCount(), 2)

    emitter.clearAllListeners()
    assert.equal(emitter.listenerCount(), 0)
  })

  test('remove any listener', async ({ assert }) => {
    await outputFile(
      join(BASE_PATH, './listeners/observer_v1.ts'),
      `
      export default class Observer {
        handle(event, data) {
          data.push(event)
        }
      }
    `
    )

    const state: string[] = []
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[]; 'resend:email': string[] }>(app)
    await app.init()

    emitter.onAny('#listeners/observer_v1')
    await emitter.emit('new:user', state)

    emitter.offAny('#listeners/observer_v1')
    await emitter.emit('resend:email', state)
    assert.deepEqual(state, ['new:user'])

    assert.equal(emitter.listenerCount(), 0)
  })

  test('fake event', async ({ assert }) => {
    await outputFile(
      join(BASE_PATH, './listeners/new_user_v8.ts'),
      `
      export default class NewUser {
        sendEmail(data) {
          data.push('invoked')
        }
      }
    `
    )

    const state: string[] = []
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.on('new:user', '#listeners/new_user_v8.sendEmail')

    const events = emitter.fake(['new:user'])
    await emitter.emit('new:user', state)

    assert.deepEqual(state, [])
    assert.deepEqual(events.all(), [{ name: 'new:user', data: [] }])
  })
})
