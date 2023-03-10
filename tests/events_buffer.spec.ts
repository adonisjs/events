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

  test('find event by callback', ({ assert, expectTypeOf }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })

    const event = events.find(({ event: eventName }) => eventName === 'new:user')

    assert.deepEqual(event, { event: 'new:user', data: { id: 1 } })
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

  test('filter events by name', ({ assert, expectTypeOf }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })

    const filteredEvents = events.filter('new:user')

    assert.deepEqual(filteredEvents, [{ event: 'new:user', data: { id: 1 } }])
    assert.deepEqual(events.filter('resend:email'), [])

    expectTypeOf(filteredEvents).toMatchTypeOf<
      (
        | { event: 'new:user'; data: { id: number } }
        | { event: 'resend:email'; data: { email: string } }
        | { event: Constructor<any>; data: any }
      )[]
    >()
  })

  test('filter events by callback', ({ assert, expectTypeOf }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })

    const filteredEvents = events.filter((event) => event.event === 'new:user')
    assert.deepEqual(filteredEvents, [{ event: 'new:user', data: { id: 1 } }])
    assert.deepEqual(events.filter('resend:email'), [])

    expectTypeOf(filteredEvents).toMatchTypeOf<
      (
        | { event: 'new:user'; data: { id: number } }
        | { event: 'resend:email'; data: { email: string } }
        | { event: Constructor<any>; data: any }
      )[]
    >()
  })

  test('filter events by class constructor', ({ assert, expectTypeOf }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()

    class UserRegistered {}
    const userRegisteredEvent = new UserRegistered()

    events.add(UserRegistered, userRegisteredEvent)

    const filteredEvents = events.filter(UserRegistered)
    assert.deepEqual(filteredEvents, [{ event: UserRegistered, data: userRegisteredEvent }])
    assert.deepEqual(events.filter('resend:email'), [])

    expectTypeOf(filteredEvents).toMatchTypeOf<
      (
        | { event: 'new:user'; data: { id: number } }
        | { event: 'resend:email'; data: { email: string } }
        | { event: Constructor<any>; data: any }
      )[]
    >()
  })

  test('check if an event exists', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })

    assert.isTrue(events.exists('new:user'))
    assert.isTrue(events.exists((event) => event.event === 'new:user'))

    assert.isFalse(events.exists('resend:email'))
    assert.isFalse(events.exists((event) => event.event === 'resend:email'))
  })

  test('get size of events in buffer', ({ assert }) => {
    const events = new EventsBuffer<{
      'new:user': { id: number }
      'resend:email': { email: string }
    }>()
    events.add('new:user', { id: 1 })

    assert.equal(events.size(), 1)
  })
})

test.group('Events buffer | assertions', () => {
  test('assert event was emitted', ({ assert }) => {
    const events = new EventsBuffer<any>()

    class UserRegistered {}
    class NewUser {}

    events.add('new:user', { id: 1 })
    events.add(NewUser, new NewUser())

    assert.doesNotThrows(() => events.assertEmitted('new:user'))
    assert.doesNotThrows(() =>
      events.assertEmitted(({ event: eventName }) => eventName === 'new:user')
    )
    assert.doesNotThrows(() => events.assertEmitted(NewUser))

    assert.throws(
      () => events.assertEmitted('user:registered'),
      'Expected "user:registered" event to be emitted'
    )
    assert.throws(
      () => events.assertEmitted(({ event: eventName }) => eventName === 'user:registered'),
      'Expected callback to find an emitted event'
    )
    assert.throws(
      () => events.assertEmitted(UserRegistered),
      'Expected "UserRegistered" event to be emitted'
    )
  })

  test('assert event was not emitted', ({ assert }) => {
    const events = new EventsBuffer<any>()

    class UserRegistered {}
    class NewUser {}

    events.add('new:user', { id: 1 })
    events.add(NewUser, new NewUser())

    assert.throws(
      () => events.assertNotEmitted('new:user'),
      'Expected "new:user" event to be not emitted'
    )
    assert.throws(
      () => events.assertNotEmitted(({ event: eventName }) => eventName === 'new:user'),
      'Expected callback to not find any event'
    )
    assert.throws(
      () => events.assertNotEmitted(NewUser),
      'Expected "NewUser" event to be not emitted'
    )

    assert.doesNotThrows(() => events.assertNotEmitted('user:registered'))
    assert.doesNotThrows(() =>
      events.assertNotEmitted(({ event: eventName }) => eventName === 'user:registered')
    )
    assert.doesNotThrows(() => events.assertNotEmitted(UserRegistered))
  })

  test('assert no events where emitted', ({ assert }) => {
    const events = new EventsBuffer<any>()

    assert.doesNotThrows(() => events.assertNoneEmitted())

    class NewUser {}
    events.add('new:user', { id: 1 })
    events.add(NewUser, new NewUser())

    assert.throws(
      () => events.assertNoneEmitted(),
      'Expected zero events to be emitted. Instead received "2" event(s)'
    )
  })
})
