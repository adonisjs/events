/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { EventsBuffer } from '../src/events_buffer.js'

test.group('Events buffer', () => {
  test('get all events', ({ assert }) => {
    const events = new EventsBuffer()
    events.events.push({ name: 'new:user', data: { id: 1 } })

    assert.deepEqual(events.all(), [{ name: 'new:user', data: { id: 1 } }])
  })

  test('find event by name', ({ assert }) => {
    const events = new EventsBuffer()
    events.events.push({ name: 'new:user', data: { id: 1 } })

    assert.deepEqual(events.find('new:user'), { name: 'new:user', data: { id: 1 } })
    assert.isNull(events.find('resend:email'))
  })

  test('find event by callback', ({ assert }) => {
    const events = new EventsBuffer()
    events.events.push({ name: 'new:user', data: { id: 1 } })

    assert.deepEqual(
      events.find((event) => event.name === 'new:user'),
      { name: 'new:user', data: { id: 1 } }
    )
    assert.isNull(events.find((event) => event.name === 'resend:email'))
  })

  test('filter events by name', ({ assert }) => {
    const events = new EventsBuffer()
    events.events.push({ name: 'new:user', data: { id: 1 } })

    assert.deepEqual(events.filter('new:user'), [{ name: 'new:user', data: { id: 1 } }])
    assert.deepEqual(events.filter('resend:email'), [])
  })

  test('find event by callback', ({ assert }) => {
    const events = new EventsBuffer()
    events.events.push({ name: 'new:user', data: { id: 1 } })

    assert.deepEqual(
      events.filter((event) => event.name === 'new:user'),
      [{ name: 'new:user', data: { id: 1 } }]
    )
    assert.deepEqual(
      events.filter((event) => event.name === 'resend:email'),
      []
    )
  })

  test('check if an event exists', ({ assert }) => {
    const events = new EventsBuffer()
    events.events.push({ name: 'new:user', data: { id: 1 } })

    assert.isTrue(events.exists('new:user'))
    assert.isTrue(events.exists((event) => event.name === 'new:user'))

    assert.isFalse(events.exists('resend:email'))
    assert.isFalse(events.exists((event) => event.name === 'resend:email'))
  })

  test('get size of events in buffer', ({ assert }) => {
    const events = new EventsBuffer()
    events.events.push({ name: 'new:user', data: { id: 1 } })

    assert.equal(events.size(), 1)
  })
})
