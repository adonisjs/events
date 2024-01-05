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

import { Emitter } from '../../src/emitter.js'

const BASE_URL = new URL('../app/', import.meta.url)

test.group('Class based events', () => {
  test('listen for a class based event', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    class UserRegistered {
      constructor(public id: number) {}
    }

    emitter.on(UserRegistered, (data) => {
      stack.push(data)
    })

    await emitter.emit(UserRegistered, new UserRegistered(1))
    assert.instanceOf(stack[0], UserRegistered)
  })

  test('attach multiple listeners for class based events', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    class UserRegistered {
      constructor(public id: number) {}
    }

    emitter.on(UserRegistered, (data) => {
      stack.push(data)
    })
    emitter.on(UserRegistered, (data) => {
      stack.push(data)
    })

    await emitter.emit(UserRegistered, new UserRegistered(1))
    assert.lengthOf(stack, 2)
    assert.instanceOf(stack[0], UserRegistered)
    assert.instanceOf(stack[1], UserRegistered)
  })

  test('get listeners for a class based event', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    class UserRegistered {
      constructor(public id: number) {}
    }

    emitter.on(UserRegistered, (data) => {
      stack.push(data)
    })

    assert.equal(emitter.eventsListeners.get(UserRegistered)?.size, 1)
  })
})
