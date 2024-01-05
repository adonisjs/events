/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import type { Constructor } from '../src/types.js'
import { EventsBuffer } from '../src/events_buffer.js'

test.group('Events buffer', () => {
  test('get all events', ({ assert, expectTypeOf }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })

    assert.deepEqual(events.all(), [{ event: 'new:user', data: { id: 1 } }])
    expectTypeOf(events.all()).toMatchTypeOf<
      (
        | { event: 'new:user'; data: { id: number } }
        | { event: 'resend:email'; data: { email: string } }
        | { event: Constructor<any>; data: any }
      )[]
    >()
  })

  test('get emitted events size', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })
    events.add('new:user', { id: 1 })
    events.add('new:user', { id: 2 })
    events.add('resend:email', { email: 'foo@bar.com' })

    assert.equal(events.size(), 4)
  })

  test('assert zero events has been emitted', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    assert.doesNotThrow(() => events.assertNoneEmitted())
    events.add('new:user', { id: 1 })
    assert.throws(
      () => events.assertNoneEmitted(),
      'Expected zero events to be emitted. Instead received "1" event'
    )
  })
})

test.group('Events buffer | find', () => {
  test('find event by name', ({ assert, expectTypeOf }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })

    const event = events.find('new:user')

    assert.deepEqual(event, { event: 'new:user', data: { id: 1 } })
    expectTypeOf(event).toMatchTypeOf<{ event: 'new:user'; data: { id: number } } | null>()
    expectTypeOf(events.find('resend:email')).toMatchTypeOf<{
      event: 'resend:email'
      data: { email: string }
    } | null>()
  })

  test('find event using finder function', ({ assert, expectTypeOf }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })
    events.add('new:user', { id: 2 })
    events.add('new:user', { id: 3 })

    const event = events.find('new:user', ({ data }) => {
      return data.id === 3
    })

    assert.deepEqual(event, { event: 'new:user', data: { id: 3 } })
    expectTypeOf(event).toMatchTypeOf<
      | { event: 'new:user'; data: any }
      | { event: 'resend:email'; data: any }
      | { event: Constructor<any>; data: any }
      | null
    >()
  })

  test('find event by class constructor', ({ assert, expectTypeOf }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()

    class UserRegistered {}
    const userRegisteredEvent = new UserRegistered()

    events.add(UserRegistered, userRegisteredEvent)
    const event = events.find(UserRegistered)

    assert.deepEqual(event, { event: UserRegistered, data: userRegisteredEvent })
    expectTypeOf(event).toMatchTypeOf<{
      event: UserRegistered
      data: typeof userRegisteredEvent
    } | null>()
  })

  test('find event by class constructor and finder function', ({ assert, expectTypeOf }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()

    class UserRegistered {
      constructor(public id: number) {}
    }

    const userRegisteredEvent = new UserRegistered(1)
    const userRegisteredEvent1 = new UserRegistered(2)

    events.add(UserRegistered, userRegisteredEvent)
    events.add(UserRegistered, userRegisteredEvent1)

    const event = events.find(UserRegistered, ({ data }) => data.id === 2)
    assert.deepEqual(event, { event: UserRegistered, data: userRegisteredEvent1 })

    expectTypeOf(event).toMatchTypeOf<{
      event: typeof UserRegistered
      data: UserRegistered
    } | null>()
  })
})

test.group('Events buffer | exist', () => {
  test('check if event exists by name', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })

    assert.isTrue(events.exists('new:user'))
  })

  test('check if event exists using finder function', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })
    events.add('new:user', { id: 2 })
    events.add('new:user', { id: 3 })

    assert.isTrue(
      events.exists('new:user', ({ data }) => {
        return data.id === 3
      })
    )
  })

  test('check if event exists by class constructor', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()

    class UserRegistered {}
    const userRegisteredEvent = new UserRegistered()

    events.add(UserRegistered, userRegisteredEvent)
    assert.isTrue(events.exists(UserRegistered))
  })

  test('check if event exists by class constructor and finder function', ({
    assert,
    expectTypeOf,
  }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()

    class UserRegistered {
      constructor(public id: number) {}
    }

    const userRegisteredEvent = new UserRegistered(1)
    const userRegisteredEvent1 = new UserRegistered(2)

    events.add(UserRegistered, userRegisteredEvent)
    events.add(UserRegistered, userRegisteredEvent1)

    assert.isTrue(
      events.exists(UserRegistered, ({ data, event }) => {
        expectTypeOf(data).toMatchTypeOf<UserRegistered>()
        expectTypeOf(event).toMatchTypeOf<typeof UserRegistered>()
        return data.id === 2
      })
    )
  })
})

test.group('Events buffer | assertEmitted', () => {
  test('assert an event was emitted', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })

    assert.doesNotThrow(() => events.assertEmitted('new:user'))
    assert.throws(
      () => events.assertEmitted('resend:email'),
      'Expected "resend:email" event to be emitted'
    )
  })

  test('assert an event was emitted using finder function', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })
    events.add('new:user', { id: 2 })
    events.add('new:user', { id: 3 })

    assert.doesNotThrow(() => events.assertEmitted('new:user'))
    assert.doesNotThrow(() => events.assertEmitted('new:user', ({ data }) => data.id === 3))
    assert.throws(
      () => events.assertEmitted('new:user', ({ data }) => data.id === 4),
      'Expected "new:user" event to be emitted'
    )
    assert.throws(
      () => events.assertEmitted('resend:email'),
      'Expected "resend:email" event to be emitted'
    )
  })

  test('assert a class based event as emitted', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()

    class UserRegistered {}
    class ResendEmail {}
    const userRegisteredEvent = new UserRegistered()

    events.add(UserRegistered, userRegisteredEvent)

    assert.doesNotThrow(() => events.assertEmitted(UserRegistered))
    assert.throws(
      () => events.assertEmitted(ResendEmail),
      'Expected "[class ResendEmail]" event to be emitted'
    )
  })

  test('assert a class based event was emitted using finder function', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()

    class ResendEmail {}
    class UserRegistered {
      constructor(public id: number) {}
    }

    const userRegisteredEvent = new UserRegistered(1)
    const userRegisteredEvent1 = new UserRegistered(2)

    events.add(UserRegistered, userRegisteredEvent)
    events.add(UserRegistered, userRegisteredEvent1)

    assert.doesNotThrow(() => events.assertEmitted(UserRegistered))
    assert.doesNotThrow(() => events.assertEmitted(UserRegistered, ({ data }) => data.id === 2))
    assert.throws(
      () => events.assertEmitted(UserRegistered, ({ data }) => data.id === 3),
      'Expected "[class UserRegistered]" event to be emitted'
    )
    assert.throws(
      () => events.assertEmitted(ResendEmail),
      'Expected "[class ResendEmail]" event to be emitted'
    )
  })
})

test.group('Events buffer | assertNotEmitted', () => {
  test('assert an event was not emitted', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })

    assert.throws(
      () => events.assertNotEmitted('new:user'),
      'Unexpected "new:user" event was emitted'
    )
    assert.doesNotThrow(() => events.assertNotEmitted('resend:email'))
  })

  test('assert an event was not emitted using finder function', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })
    events.add('new:user', { id: 2 })
    events.add('new:user', { id: 3 })

    assert.throws(
      () => events.assertNotEmitted('new:user'),
      'Unexpected "new:user" event was emitted'
    )
    assert.doesNotThrow(() => events.assertNotEmitted('new:user', ({ data }) => data.id === 4))
    assert.doesNotThrow(() => events.assertNotEmitted('resend:email'))
  })

  test('assert a class based event as not emitted', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()

    class UserRegistered {}
    class ResendEmail {}
    const userRegisteredEvent = new UserRegistered()

    events.add(UserRegistered, userRegisteredEvent)

    assert.throws(
      () => events.assertNotEmitted(UserRegistered),
      'Unexpected "[class UserRegistered]" event was emitted'
    )
    assert.doesNotThrow(() => events.assertNotEmitted(ResendEmail))
  })

  test('assert a class based event was not emitted using finder function', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()

    class ResendEmail {}
    class UserRegistered {
      constructor(public id: number) {}
    }

    const userRegisteredEvent = new UserRegistered(1)
    const userRegisteredEvent1 = new UserRegistered(2)

    events.add(UserRegistered, userRegisteredEvent)
    events.add(UserRegistered, userRegisteredEvent1)

    assert.throws(
      () => events.assertNotEmitted(UserRegistered),
      'Unexpected "[class UserRegistered]" event was emitted'
    )
    assert.doesNotThrow(
      () => events.assertNotEmitted(UserRegistered, ({ data }) => data.id === 3),
      'Expected "[class UserRegistered]" event to be emitted'
    )
    assert.doesNotThrow(
      () => events.assertNotEmitted(ResendEmail),
      'Expected "[class ResendEmail]" event to be emitted'
    )
  })
})

test.group('Events buffer | assertEmittedCount', () => {
  test('assert emitted event count', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })

    assert.doesNotThrow(() => events.assertEmittedCount('new:user', 1))
    assert.throws(
      () => events.assertEmittedCount('new:user', 2),
      'Expected "new:user" event to be emitted "2" times, instead it was emitted "1" time'
    )
  })

  test('assert emitted count of class based event', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()

    class UserRegistered {}
    const userRegisteredEvent = new UserRegistered()

    events.add(UserRegistered, userRegisteredEvent)

    assert.doesNotThrow(() => events.assertEmittedCount(UserRegistered, 1))
    assert.throws(
      () => events.assertEmittedCount(UserRegistered, 2),
      'Expected "[class UserRegistered]" event to be emitted "2" times, instead it was emitted "1" time'
    )
  })
})
