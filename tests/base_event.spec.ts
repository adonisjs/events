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

import { Emitter } from '../src/emitter.js'
import { BaseEvent } from '../src/base_event.js'

const BASE_URL = new URL('./app/', import.meta.url)

test.group('Base event', () => {
  test('dispatch event using the event class', async ({ assert }) => {
    const stack: UserRegistered[] = []
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    class UserRegistered extends BaseEvent {}
    UserRegistered.useEmitter(emitter)

    emitter.on(UserRegistered, (event) => stack.push(event))
    await UserRegistered.dispatch()

    assert.deepEqual(stack, [new UserRegistered()])
  })

  test('pass event arguments via dispatch method', async ({ assert }) => {
    const stack: UserRegistered[] = []
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    class UserRegistered extends BaseEvent {
      constructor(
        public email: string,
        public name: string
      ) {
        super()
      }
    }

    UserRegistered.useEmitter(emitter)

    emitter.on(UserRegistered, (event) => stack.push(event))
    await UserRegistered.dispatch('foo@bar.com', 'foo')

    assert.deepEqual(stack, [new UserRegistered('foo@bar.com', 'foo')])
  })

  test('event dispatched on child class should not invoke parent class listeners', async ({
    assert,
  }) => {
    const stack: UserRegistered[] = []
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    class EntityRegistered extends BaseEvent {
      constructor(
        public email: string,
        public name: string
      ) {
        super()
      }
    }
    EntityRegistered.useEmitter(emitter)

    class UserRegistered extends EntityRegistered {
      constructor(email: string, name: string) {
        super(email, name)
      }
    }

    emitter.on(UserRegistered, (event) => stack.push(event))
    emitter.on(EntityRegistered, (event) => stack.push(event))

    await UserRegistered.dispatch('foo@bar.com', 'foo')
    assert.deepEqual(stack, [new UserRegistered('foo@bar.com', 'foo')])
  })

  test('event dispatched on parent class should not invoke child class listeners', async ({
    assert,
  }) => {
    const stack: UserRegistered[] = []
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter(app)

    class EntityRegistered extends BaseEvent {
      constructor(
        public email: string,
        public name: string
      ) {
        super()
      }
    }
    EntityRegistered.useEmitter(emitter)

    class UserRegistered extends EntityRegistered {
      constructor(email: string, name: string) {
        super(email, name)
      }
    }

    emitter.on(UserRegistered, (event) => stack.push(event))
    emitter.on(EntityRegistered, (event) => stack.push(event))

    await EntityRegistered.dispatch('foo@bar.com', 'foo')
    assert.deepEqual(stack, [new EntityRegistered('foo@bar.com', 'foo')])
  })

  test('raise error when base event does not have the emitter', async ({ assert }) => {
    class UserRegistered extends BaseEvent {}
    await assert.rejects(
      () => UserRegistered.dispatch(),
      'Cannot dispatch "UserRegistered" event. Make sure to pass emitter to the "BaseEvent" class for dispatch method to work'
    )
  })
})
