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

import { Emitter } from '../../src/emitter.js'
import { Application } from '@adonisjs/application'

const BASE_URL = new URL('../app/', import.meta.url)
const BASE_PATH = fileURLToPath(BASE_URL)

type NewUserEvent = { id: number }

test.group('Emitter | emit', (group) => {
  group.each.teardown(async () => {
    return () => remove(BASE_PATH)
  })

  test('emit event multiple times', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.on('new:user', (data) => {
      stack.push(data)
    })

    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('new:user', { id: 2 })
    assert.deepEqual(stack, [{ id: 1 }, { id: 2 }])
  })

  test('validate emit types', async ({ assert, expectTypeOf }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    emitter.on('new:user', (data) => {
      stack.push(data)
    })

    expectTypeOf(emitter.emit).parameters.toEqualTypeOf<['new:user', NewUserEvent]>()
    await emitter.emit('new:user', { id: 2 })
    assert.deepEqual(stack, [{ id: 2 }])
  })

  test('raise exception when listener fails', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.on('new:user', () => {
      throw new Error('boom')
    })

    await assert.rejects(() => emitter.emit('new:user', { id: 1 }), 'boom')
  })

  test('raise exception when magic string listener fails', async ({ assert }) => {
    await outputFile(
      join(BASE_PATH, './listeners/raises_exception.ts'),
      `
      export default class RaisesException {
        handle() {
          throw new Error('boom')
        }
      }
    `
    )

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)
    await app.init()

    emitter.on('new:user', '#listeners/raises_exception')
    await assert.rejects(() => emitter.emit('new:user', { id: 1 }), 'boom')
  })

  test('raise exception when lazy loaded listener fails', async ({ assert }) => {
    const NewUserListener = async () => {
      return {
        default: class NewUser {
          sendEmail() {
            throw new Error('boom')
          }
        },
      }
    }

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)
    await app.init()

    emitter.on('new:user', [NewUserListener, 'sendEmail'])
    await assert.rejects(() => emitter.emit('new:user', { id: 1 }), 'boom')
  })

  test('raise exception when class reference listener fails', async ({ assert }) => {
    class NewUser {
      sendEmail() {
        throw new Error('boom')
      }
    }

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)
    await app.init()

    emitter.on('new:user', [NewUser, 'sendEmail'])
    await assert.rejects(() => emitter.emit('new:user', { id: 1 }), 'boom')
  })
})

test.group('Emitter | emit | with error handler', (group) => {
  group.each.teardown(async () => {
    return () => remove(BASE_PATH)
  })

  test('capture error using onError handler', async ({ assert }, done) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.onError((event, error) => {
      assert.equal(event, 'new:user')
      assert.equal(error.message, 'boom')
      done()
    })

    emitter.on('new:user', () => {
      throw new Error('boom')
    })

    await emitter.emit('new:user', { id: 1 })
  }).waitForDone()

  test('raise exception when magic string listener fails', async ({ assert }, done) => {
    await outputFile(
      join(BASE_PATH, './listeners/raises_exception.ts'),
      `
      export default class RaisesException {
        handle() {
          throw new Error('boom')
        }
      }
    `
    )

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)
    await app.init()

    emitter.onError((event, error) => {
      assert.equal(event, 'new:user')
      assert.equal(error.message, 'boom')
      done()
    })

    emitter.on('new:user', '#listeners/raises_exception')
    await emitter.emit('new:user', { id: 1 })
  }).waitForDone()

  test('raise exception when lazy loaded listener fails', async ({ assert }, done) => {
    const NewUserListener = async () => {
      return {
        default: class NewUser {
          sendEmail() {
            throw new Error('boom')
          }
        },
      }
    }

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)
    await app.init()

    emitter.onError((event, error) => {
      assert.equal(event, 'new:user')
      assert.equal(error.message, 'boom')
      done()
    })

    emitter.on('new:user', [NewUserListener, 'sendEmail'])
    await emitter.emit('new:user', { id: 1 })
  }).waitForDone()

  test('raise exception when class reference listener fails', async ({ assert }, done) => {
    class NewUser {
      sendEmail() {
        throw new Error('boom')
      }
    }

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)
    await app.init()

    emitter.onError((event, error) => {
      assert.equal(event, 'new:user')
      assert.equal(error.message, 'boom')
      done()
    })

    emitter.on('new:user', [NewUser, 'sendEmail'])
    await emitter.emit('new:user', { id: 1 })
  }).waitForDone()
})

test.group('Emitter | fake', () => {
  test('fake event', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.on('new:user', (data) => {
      stack.push(data)
    })

    const events = emitter.fake(['new:user'])

    await emitter.emit('new:user', { id: 1 })
    assert.deepEqual(stack, [])
    assert.deepEqual(events.all(), [{ name: 'new:user', data: { id: 1 } }])
  })

  test('faking multiple times should drop old fakes', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.on('new:user', (data) => {
      stack.push(data)
    })
    emitter.on('resend:email', (data) => {
      stack.push(data)
    })

    const events = emitter.fake(['new:user'])
    const events1 = emitter.fake(['resend:email'])

    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('resend:email', { email: 'foo@bar.com' })

    assert.deepEqual(stack, [{ id: 1 }])
    assert.deepEqual(events.all(), [])
    assert.deepEqual(events1.all(), [{ name: 'resend:email', data: { email: 'foo@bar.com' } }])
  })

  test('fake all events', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.on('new:user', (data) => {
      stack.push(data)
    })
    emitter.on('resend:email', (data) => {
      stack.push(data)
    })

    const events = emitter.fake()
    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('resend:email', { email: 'foo@bar.com' })

    assert.deepEqual(stack, [])
    assert.deepEqual(events.all(), [
      { name: 'new:user', data: { id: 1 } },
      { name: 'resend:email', data: { email: 'foo@bar.com' } },
    ])
  })

  test('do not invoke "onAny" listeners when all events are faked', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.onAny((data) => {
      stack.push(data)
    })

    const events = emitter.fake()
    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('resend:email', { email: 'foo@bar.com' })

    assert.deepEqual(stack, [])
    assert.deepEqual(events.all(), [
      { name: 'new:user', data: { id: 1 } },
      { name: 'resend:email', data: { email: 'foo@bar.com' } },
    ])
  })

  test('invoke "onAny" listeners when some events are not faked', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.onAny((name, data) => {
      stack.push({ name, data })
    })

    const events = emitter.fake(['resend:email'])
    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('resend:email', { email: 'foo@bar.com' })

    assert.deepEqual(stack, [{ name: 'new:user', data: { id: 1 } }])
    assert.deepEqual(events.all(), [{ name: 'resend:email', data: { email: 'foo@bar.com' } }])
  })
})
