/*
* @poppinss/events
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import * as test from 'japa'
import { Emitter } from '../src/Emitter'
import { FakeEmitter } from '../src/FakeEmitter'

test.group('Events', () => {
  test('listen for an event', async (assert) => {
    assert.plan(2)

    const event = new Emitter()
    event.on('new:user', (data) => {
      assert.deepEqual(data, { id: 1 })
    })

    await Promise.all([
      event.emit('new:user', { id: 1 }),
      event.emit('new:user', { id: 1 }),
    ])
  })

  test('listen for an event only once', async (assert) => {
    assert.plan(1)

    const event = new Emitter()
    event.once('new:user', (data) => {
      assert.deepEqual(data, { id: 1 })
    })

    await Promise.all([
      event.emit('new:user', { id: 1 }),
      event.emit('new:user', { id: 1 }),
    ])
  })

  test('listen for any events', async (assert) => {
    assert.plan(5)

    const event = new Emitter()
    event.once('new:user', (data) => {
      assert.deepEqual(data, { id: 1 })
    })

    event.onAny((event, data) => {
      assert.equal(event, 'new:user')
      assert.deepEqual(data, { id: 1 })
    })

    await Promise.all([
      event.emit('new:user', { id: 1 }),
      event.emit('new:user', { id: 1 }),
    ])
  })

  test('remove event listener', async (assert) => {
    assert.plan(1)

    const event = new Emitter()

    function listener (data) {
      event.off('new:user', listener)
      assert.deepEqual(data, { id: 1 })
    }

    event.on('new:user', listener)

    await Promise.all([
      event.emit('new:user', { id: 1 }),
      event.emit('new:user', { id: 1 }),
    ])
  })

  test('remove all event listeners for a given event', async (assert) => {
    assert.plan(1)

    const event = new Emitter()

    event.once('new:user', (data) => {
      event.clearListeners('new:user')
      assert.deepEqual(data, { id: 1 })
    })

    await Promise.all([
      event.emit('new:user', { id: 1 }),
      event.emit('new:user', { id: 1 }),
    ])
  })

  test('remove listeners for all events', async (assert) => {
    assert.plan(3)

    const event = new Emitter()

    event.once('new:user', (data) => {
      event.clearAllListeners()
      assert.deepEqual(data, { id: 1 })
    })

    event.onAny((event, data) => {
      assert.equal(event, 'new:user')
      assert.deepEqual(data, { id: 1 })
    })

    await event.emit('new:user', { id: 1 })
    await event.emit('new:account', { id: 1 })
  })

  test('get listener counts', async (assert) => {
    const event = new Emitter()
    event.onAny(() => {
    })

    event.on('new:user', () => {
    })

    event.on('new:account', () => {
    })

    assert.equal(event.listenerCount('new:user'), 2)
    assert.equal(event.listenerCount('new:account'), 2)
    assert.equal(event.listenerCount(), 3)
  })

  test('remove any listener', async (assert) => {
    const event = new Emitter()
    function anyListener () {}
    event.onAny(anyListener)

    event.on('new:user', () => {
    })

    event.on('new:account', () => {
    })

    assert.equal(event.listenerCount('new:user'), 2)
    assert.equal(event.listenerCount('new:account'), 2)
    assert.equal(event.listenerCount(), 3)

    event.offAny(anyListener)
    assert.equal(event.listenerCount('new:user'), 1)
    assert.equal(event.listenerCount('new:account'), 1)
    assert.equal(event.listenerCount(), 2)
  })

  test('emit via typed emitter', async (assert) => {
    assert.plan(2)

    const event = new Emitter<{ 'new:user': { id: number } }>()
    event.on('new:user', (data) => {
      assert.deepEqual(data, { id: 1 })
    })

    await event.for('new:user').emit({ id: 1 })
    assert.equal(event.listenerCount(), 1)
  })

  test('listen via typed emitter', async (assert) => {
    assert.plan(2)

    const event = new Emitter<{ 'new:user': { id: number } }>()
    event.for('new:user').on((data) => {
      assert.deepEqual(data, { id: 1 })
    })

    await event.for('new:user').emit({ id: 1 })
    assert.equal(event.listenerCount(), 1)
  })

  test('collect events within memory with fake emitter', async (assert) => {
    const emitter = new FakeEmitter()
    await emitter.emit('new:user', { id: 1 })

    assert.deepEqual(emitter.transport.events, [{ event: 'new:user', data: { id: 1 } }])
  })
})
