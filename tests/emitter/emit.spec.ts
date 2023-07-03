/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { fileURLToPath } from 'node:url'
import { setTimeout } from 'node:timers/promises'
import { Application } from '@adonisjs/application'

import { Emitter } from '../../src/emitter.js'

const BASE_URL = new URL('../app/', import.meta.url)
const BASE_PATH = fileURLToPath(BASE_URL)

type NewUserEvent = { id: number }

test.group('Emitter | emit', (group) => {
  group.each.setup(async ({ context }) => {
    context.fs.baseUrl = BASE_URL
    context.fs.basePath = BASE_PATH
  })

  test('emit event multiple times', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter(app)

    emitter.on('new:user', (data) => {
      stack.push(data)
    })

    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('new:user', { id: 2 })
    assert.deepEqual(stack, [{ id: 1 }, { id: 2 }])
  })

  test('emit event for class based events', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter(app)

    class UserRegistered {
      constructor(public email: string) {}
    }

    emitter.on(UserRegistered, (data) => {
      stack.push(data)
    })

    await emitter.emit(UserRegistered, new UserRegistered('foo@bar.com'))
    await emitter.emit(UserRegistered, new UserRegistered('baz@bar.com'))
    assert.deepEqual(stack, [new UserRegistered('foo@bar.com'), new UserRegistered('baz@bar.com')])
  })

  test('validate emit types', async ({ assert, expectTypeOf }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    class UserRegistered {
      constructor(public email: string) {}
    }

    emitter.on('new:user', (data) => {
      stack.push(data)
    })
    emitter.on(UserRegistered, (data) => {
      stack.push(data)
    })

    expectTypeOf(emitter.emit).parameters.toEqualTypeOf<['new:user', NewUserEvent]>()

    await emitter.emit('new:user', { id: 2 })
    await emitter.emit(UserRegistered, new UserRegistered('foo@bar.com'))

    assert.deepEqual(stack, [{ id: 2 }, new UserRegistered('foo@bar.com')])
  })

  test('raise exception when listener fails', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter(app)

    emitter.on('new:user', () => {
      throw new Error('boom')
    })

    await assert.rejects(() => emitter.emit('new:user', { id: 1 }), 'boom')
  })

  test('raise exception when magic string listener fails', async ({ assert, fs }) => {
    await fs.create(
      'listeners/raises_exception.ts',
      `
      export default class RaisesException {
        handle() {
          throw new Error('boom')
        }
      }
    `
    )

    const app = new Application(fs.baseUrl, { environment: 'web', importer: () => {} })
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

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
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

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter(app)
    await app.init()

    emitter.on('new:user', [NewUser, 'sendEmail'])
    await assert.rejects(() => emitter.emit('new:user', { id: 1 }), 'boom')
  })

  test('invoke listeners serially', async ({ assert }) => {
    let stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter(app)

    emitter.on('new:user', async () => {
      stack.push('1st listener')
    })

    emitter.on('new:user', async () => {
      await setTimeout(300)
      stack.push('2nd listener')
    })

    emitter.on('new:user', async () => {
      stack.push('3rd listener')
    })

    await emitter.emit('new:user', {})
    assert.deepEqual(stack, ['1st listener', '3rd listener', '2nd listener'])

    stack = []
    await emitter.emitSerial('new:user', {})
    assert.deepEqual(stack, ['1st listener', '2nd listener', '3rd listener'])
  })
})

test.group('Emitter | emit | with error handler', (group) => {
  group.each.setup(async ({ context }) => {
    context.fs.baseUrl = BASE_URL
    context.fs.basePath = BASE_PATH
  })

  test('capture error using onError handler', async ({ assert }, done) => {
    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
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

  test('raise exception when magic string listener fails', async ({ assert, fs }, done) => {
    await fs.create(
      './listeners/raises_exception.ts',
      `
      export default class RaisesException {
        handle() {
          throw new Error('boom')
        }
      }
    `
    )

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
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

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
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

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
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

  test('capture error using onError handler during emitSerial', async ({ assert }, done) => {
    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter(app)

    emitter.onError((event, error) => {
      assert.equal(event, 'new:user')
      assert.equal(error.message, 'boom')
      done()
    })

    emitter.on('new:user', () => {
      throw new Error('boom')
    })

    await emitter.emitSerial('new:user', { id: 1 })
  }).waitForDone()

  test('throw error when no error listener is defined during emitSerial', async () => {
    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter(app)

    emitter.on('new:user', () => {
      throw new Error('boom')
    })

    await emitter.emitSerial('new:user', { id: 1 })
  }).throws('boom')
})

test.group('Emitter | fake', () => {
  test('fake event', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter(app)

    emitter.on('new:user', (data) => {
      stack.push(data)
    })

    const events = emitter.fake(['new:user'])

    await emitter.emit('new:user', { id: 1 })
    assert.deepEqual(stack, [])
    assert.deepEqual(events.all(), [{ event: 'new:user', data: { id: 1 } }])
  })

  test('fake event with emitSerial', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter(app)

    emitter.on('new:user', (data) => {
      stack.push(data)
    })

    const events = emitter.fake(['new:user'])

    await emitter.emitSerial('new:user', { id: 1 })
    assert.deepEqual(stack, [])
    assert.deepEqual(events.all(), [{ event: 'new:user', data: { id: 1 } }])
  })

  test('faking multiple times should drop old fakes', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
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
    assert.deepEqual(events1.all(), [{ event: 'resend:email', data: { email: 'foo@bar.com' } }])
  })

  test('fake all events', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
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
      { event: 'new:user', data: { id: 1 } },
      { event: 'resend:email', data: { email: 'foo@bar.com' } },
    ])
  })

  test('do not invoke "onAny" listeners when all events are faked', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter(app)

    emitter.onAny((data) => {
      stack.push(data)
    })

    const events = emitter.fake()
    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('resend:email', { email: 'foo@bar.com' })

    assert.deepEqual(stack, [])
    assert.deepEqual(events.all(), [
      { event: 'new:user', data: { id: 1 } },
      { event: 'resend:email', data: { email: 'foo@bar.com' } },
    ])
  })

  test('invoke "onAny" listeners when some events are not faked', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web', importer: () => {} })
    const emitter = new Emitter(app)

    emitter.onAny((name, data) => {
      stack.push({ name, data })
    })

    const events = emitter.fake(['resend:email'])
    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('resend:email', { email: 'foo@bar.com' })

    assert.deepEqual(stack, [{ name: 'new:user', data: { id: 1 } }])
    assert.deepEqual(events.all(), [{ event: 'resend:email', data: { email: 'foo@bar.com' } }])
  })
})
