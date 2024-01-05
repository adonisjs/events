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

import { Emitter } from '../../src/emitter.js'
import { Application } from '@adonisjs/application'

const BASE_URL = new URL('../app/', import.meta.url)
const BASE_PATH = fileURLToPath(BASE_URL)

type NewUserEvent = { id: number }

test.group('Emitter | listenOnce', () => {
  test('listen once for an event', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    emitter.once('new:user', (data) => {
      stack.push(data)
    })

    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('new:user', { id: 1 })
    assert.deepEqual(stack, [{ id: 1 }])
    assert.isUndefined(emitter.eventsListeners.get('new:user'))
  })

  test('register multiple listeners even when callback is the same', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    function listener(data: any) {
      stack.push(data)
    }

    emitter.once('new:user', listener)
    emitter.once('new:user', listener)

    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('new:user', { id: 2 })

    assert.deepEqual(stack, [{ id: 1 }, { id: 1 }])
    assert.isUndefined(emitter.eventsListeners.get('new:user'))
  })

  test('infer event data type in listener callback', async ({ assert, expectTypeOf }) => {
    const stack: NewUserEvent[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    emitter.once('new:user', (data) => {
      expectTypeOf(data).toEqualTypeOf<NewUserEvent>()
      stack.push(data)
    })

    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('new:user', { id: 1 })
    assert.deepEqual(stack, [{ id: 1 }])
    assert.isUndefined(emitter.eventsListeners.get('new:user'))
  })

  test('listen once for a class based event', async ({ assert, expectTypeOf }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': { id: number } }>(app)

    class UserRegistered {
      constructor(public email: string) {}
    }

    emitter.once(UserRegistered, (event) => {
      assert.instanceOf(event, UserRegistered)
      expectTypeOf(event).toEqualTypeOf<UserRegistered>()
      stack.push(event)
    })

    await emitter.emit(UserRegistered, new UserRegistered('foo@bar.com'))
    await emitter.emit(UserRegistered, new UserRegistered('foo@bar.com'))
    assert.deepEqual(stack, [new UserRegistered('foo@bar.com')])

    assert.isUndefined(emitter.eventsListeners.get(UserRegistered))
  })

  test('define multiple listeners for a class based event', async ({ assert, expectTypeOf }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': { id: number } }>(app)

    class UserRegistered {
      constructor(public email: string) {}
    }

    emitter.once(UserRegistered, (event) => {
      assert.instanceOf(event, UserRegistered)
      expectTypeOf(event).toEqualTypeOf<UserRegistered>()
      stack.push(event)
    })

    emitter.once(UserRegistered, (event) => {
      assert.instanceOf(event, UserRegistered)
      expectTypeOf(event).toEqualTypeOf<UserRegistered>()
      stack.push(event)
    })

    await emitter.emit(UserRegistered, new UserRegistered('foo@bar.com'))
    await emitter.emit(UserRegistered, new UserRegistered('foo@bar.com'))
    assert.deepEqual(stack, [new UserRegistered('foo@bar.com'), new UserRegistered('foo@bar.com')])
    assert.isUndefined(emitter.eventsListeners.get(UserRegistered))
  })
})

test.group('Emitter | listenOnce | magic string listener', (group) => {
  group.each.setup(async ({ context }) => {
    context.fs.baseUrl = BASE_URL
    context.fs.basePath = BASE_PATH
  })

  test('lazy load listener using magic string', async ({ assert, fs }) => {
    await fs.create(
      './listeners/new_user.ts',
      `
      export default class NewUser {
        sendEmail(data) {
          data.push('invoked')
        }
      }
    `
    )

    const stack: string[] = []

    const app = new Application(BASE_URL, {
      environment: 'web',
      importer(filePath) {
        return import(filePath)
      },
    })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.once('new:user', '#listeners/new_user.sendEmail')
    await emitter.emit('new:user', stack)
    await emitter.emit('new:user', stack)

    assert.deepEqual(stack, ['invoked'])
    assert.isUndefined(emitter.eventsListeners.get('new:user'))
  })

  test('register multiple listeners when using magic strings', async ({ assert, fs }) => {
    await fs.create(
      './listeners/new_user.mod.ts',
      `
      export default class NewUser {
        sendEmail(data) {
          data.push('invoked')
        }
      }
    `
    )

    const stack: string[] = []

    const app = new Application(BASE_URL, {
      environment: 'web',
      importer(filePath) {
        return import(filePath)
      },
    })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.once('new:user', '#listeners/new_user.mod.sendEmail')
    emitter.once('new:user', '#listeners/new_user.mod.sendEmail')

    await emitter.emit('new:user', stack)
    await emitter.emit('new:user', stack)

    assert.deepEqual(stack, ['invoked', 'invoked'])
    assert.isUndefined(emitter.eventsListeners.get('new:user'))
  })
})

test.group('Emitter | listen | lazily loaded listener', () => {
  test('lazy load listener', async ({ assert }) => {
    const stack: string[] = []
    const NewUserListener = async () => {
      return {
        default: class NewUser {
          sendEmail(data: string[]) {
            data.push('invoked')
          }
        },
      }
    }

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.once('new:user', [NewUserListener, 'sendEmail'])

    await emitter.emit('new:user', stack)
    await emitter.emit('new:user', stack)

    assert.deepEqual(stack, ['invoked'])
    assert.isUndefined(emitter.eventsListeners.get('new:user'))
  })

  test('register multiple listeners when using lazy load function', async ({ assert }) => {
    const stack: string[] = []
    const NewUserListener = async () => {
      return {
        default: class NewUser {
          sendEmail(data: string[]) {
            data.push('invoked')
          }
        },
      }
    }
    const sendEmail: [typeof NewUserListener, 'sendEmail'] = [NewUserListener, 'sendEmail']

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': string[] }>(app)
    await app.init()

    emitter.once('new:user', sendEmail)
    emitter.once('new:user', sendEmail)
    emitter.once('new:user', sendEmail)

    await emitter.emit('new:user', stack)
    await emitter.emit('new:user', stack)
    await emitter.emit('new:user', stack)

    assert.deepEqual(stack, ['invoked', 'invoked', 'invoked'])
    assert.isUndefined(emitter.eventsListeners.get('new:user'))
  })
})
