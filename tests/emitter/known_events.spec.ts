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

type NewUserEvent = { id: number }
type ResendEmailEvent = { email: string }

test.group('Emitter | Known events', (group) => {
  group.each.teardown(async () => {})

  test('listen for an event', async ({ assert, expectTypeOf }) => {
    const stack: NewUserEvent[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    emitter.on('new:user', (data) => {
      stack.push(data)
    })

    await emitter.emit('new:user', { id: 1 })

    expectTypeOf(emitter.emit).parameters.toEqualTypeOf<['new:user', NewUserEvent]>()
    assert.deepEqual(stack, [{ id: 1 }])
  })

  test('listen for an event only once', async ({ assert, expectTypeOf }) => {
    const stack: NewUserEvent[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)
    emitter.once('new:user', (data) => {
      stack.push(data)
    })

    await emitter.emit('new:user', { id: 1 })
    await emitter.emit('new:user', { id: 2 })
    await emitter.emit('new:user', { id: 3 })

    expectTypeOf(emitter.emit).parameters.toEqualTypeOf<['new:user', NewUserEvent]>()
    assert.deepEqual(stack, [{ id: 1 }])
  })

  test('raise exception when listener fails', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    emitter.on('new:user', () => {
      throw new Error('boom')
    })

    await assert.rejects(() => emitter.emit('new:user', { id: 1 }), 'boom')
  })

  test('notify error handler when a listener fails', async ({ assert, expectTypeOf }, done) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    emitter.on('new:user', () => {
      throw new Error('boom')
    })

    emitter.onError((event, error) => {
      expectTypeOf(event).toEqualTypeOf<'new:user'>()
      assert.equal(event, 'new:user')
      assert.equal(error.message, 'boom')
      done()
    })

    await assert.doesNotRejects(() => emitter.emit('new:user', { id: 1 }))
  }).waitForDone()

  test('listen for any event', async ({ assert, expectTypeOf }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    emitter.onAny((event, data) => {
      expectTypeOf(event).toMatchTypeOf<'new:user'>()
      expectTypeOf(data).toEqualTypeOf<NewUserEvent>()
      stack.push({ event, data })
    })

    await emitter.emit('new:user', { id: 1 })
    assert.deepEqual(stack, [{ event: 'new:user', data: { id: 1 } }])
  })

  test('find if there are listeners for a specific event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    emitter.on('new:user', () => {})

    assert.isTrue(emitter.hasListeners('new:user'))
    // @ts-expect-error
    assert.isFalse(emitter.hasListeners('resend:email'))
  })

  test('find if there are listeners for any event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    emitter.on('new:user', () => {})

    assert.isTrue(emitter.hasListeners())
  })

  test('get count of listeners for a specific event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent }>(app)

    emitter.on('new:user', () => {})

    assert.equal(emitter.listenerCount('new:user'), 1)
    // @ts-expect-error
    assert.equal(emitter.listenerCount('resend:email'), 0)
  })

  test('get count of listeners for any event', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent; 'resend:email': ResendEmailEvent }>(app)

    emitter.on('new:user', () => {})
    emitter.on('resend:email', () => {})

    assert.equal(emitter.listenerCount(), 2)
  })

  test('remove a specific listeners', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent; 'resend:email': ResendEmailEvent }>(app)

    function sendEmail() {}

    emitter.on('new:user', () => {})
    emitter.on('resend:email', () => {})
    emitter.on('resend:email', sendEmail)
    assert.equal(emitter.listenerCount(), 3)

    emitter.clearListener('resend:email', sendEmail)
    assert.equal(emitter.listenerCount(), 2)
  })

  test('remove all listeners for a specific events', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent; 'resend:email': ResendEmailEvent }>(app)

    function sendEmail() {}

    emitter.on('new:user', () => {})
    emitter.on('resend:email', () => {})
    emitter.on('resend:email', sendEmail)
    assert.equal(emitter.listenerCount(), 3)

    emitter.clearListeners('resend:email')
    assert.equal(emitter.listenerCount(), 1)
  })

  test('remove all listeners for all events', async ({ assert }) => {
    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent; 'resend:email': ResendEmailEvent }>(app)

    function sendEmail() {}

    emitter.on('new:user', () => {})
    emitter.on('resend:email', () => {})
    emitter.on('resend:email', sendEmail)
    assert.equal(emitter.listenerCount(), 3)

    emitter.clearAllListeners()
    assert.equal(emitter.listenerCount(), 0)
  })

  test('remove any listener', async ({ assert }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent; 'resend:email': ResendEmailEvent }>(app)

    function sendEmail() {}

    emitter.onAny((event, data) => {
      stack.push({ event, data })
    })
    emitter.onAny(sendEmail)

    assert.equal(emitter.listenerCount(), 2)
    emitter.offAny(sendEmail)

    assert.equal(emitter.listenerCount(), 1)
  })

  test('fake event', async ({ assert, expectTypeOf }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent; 'resend:email': ResendEmailEvent }>(app)

    emitter.on('new:user', (data) => {
      expectTypeOf(data).toEqualTypeOf<NewUserEvent>()
      stack.push(data)
    })

    const events = emitter.fake(['new:user'])

    await emitter.emit('new:user', { id: 1 })
    assert.deepEqual(stack, [])
    assert.deepEqual(events.all(), [{ name: 'new:user', data: { id: 1 } }])
  })

  test('faking multiple times from drop old fakes', async ({ assert, expectTypeOf }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent; 'resend:email': ResendEmailEvent }>(app)

    emitter.on('new:user', (data) => {
      expectTypeOf(data).toEqualTypeOf<NewUserEvent>()
      stack.push(data)
    })

    emitter.on('resend:email', (data) => {
      expectTypeOf(data).toEqualTypeOf<ResendEmailEvent>()
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

  test('fake all events', async ({ assert, expectTypeOf }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent; 'resend:email': ResendEmailEvent }>(app)

    emitter.on('new:user', (data) => {
      expectTypeOf(data).toEqualTypeOf<NewUserEvent>()
      stack.push(data)
    })

    emitter.on('resend:email', (data) => {
      expectTypeOf(data).toEqualTypeOf<ResendEmailEvent>()
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

  test('do not invoke any listeners when events are faked', async ({ assert, expectTypeOf }) => {
    const stack: any[] = []

    const app = new Application(BASE_URL, { environment: 'web' })
    const emitter = new Emitter<{ 'new:user': NewUserEvent; 'resend:email': ResendEmailEvent }>(app)

    emitter.onAny((event, data) => {
      expectTypeOf(event).toEqualTypeOf<'new:user' | 'resend:email'>()
      expectTypeOf(data).toEqualTypeOf<NewUserEvent | ResendEmailEvent>()
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
})
