/*
 * @adonisjs/events
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { Ioc } from '@adonisjs/fold'
import { Emitter } from '../src/Emitter'
import { FakeEmitter } from '../src/FakeEmitter'

test.group('Events', () => {
	test('listen for an event', async (assert) => {
		assert.plan(2)

		const event = new Emitter(new Ioc())
		event.on('new:user', (data) => {
			assert.deepEqual(data, { id: 1 })
		})

		await Promise.all([event.emit('new:user', { id: 1 }), event.emit('new:user', { id: 1 })])
	})

	test('listen for an event only once', async (assert) => {
		assert.plan(1)

		const event = new Emitter(new Ioc())
		event.once('new:user', (data) => {
			assert.deepEqual(data, { id: 1 })
		})

		await Promise.all([event.emit('new:user', { id: 1 }), event.emit('new:user', { id: 1 })])
	})

	test('listen for any events', async (assert) => {
		assert.plan(5)

		const event = new Emitter(new Ioc())
		event.once('new:user', (data) => {
			assert.deepEqual(data, { id: 1 })
		})

		event.onAny((name, data) => {
			assert.equal(name, 'new:user')
			assert.deepEqual(data, { id: 1 })
		})

		await Promise.all([event.emit('new:user', { id: 1 }), event.emit('new:user', { id: 1 })])
	})

	test('remove event listener', async (assert) => {
		assert.plan(1)

		const event = new Emitter(new Ioc())

		function listener(data) {
			event.off('new:user', listener)
			assert.deepEqual(data, { id: 1 })
		}

		event.on('new:user', listener)

		await Promise.all([event.emit('new:user', { id: 1 }), event.emit('new:user', { id: 1 })])
	})

	test('remove all event listeners for a given event', async (assert) => {
		assert.plan(1)

		const event = new Emitter(new Ioc())

		event.once('new:user', (data) => {
			event.clearListeners('new:user')
			assert.deepEqual(data, { id: 1 })
		})

		await Promise.all([event.emit('new:user', { id: 1 }), event.emit('new:user', { id: 1 })])
	})

	test('remove listeners for all events', async (assert) => {
		assert.plan(3)

		const event = new Emitter(new Ioc())

		event.once('new:user', (data) => {
			event.clearAllListeners()
			assert.deepEqual(data, { id: 1 })
		})

		event.onAny((name, data) => {
			assert.equal(name, 'new:user')
			assert.deepEqual(data, { id: 1 })
		})

		await event.emit('new:user', { id: 1 })
		await event.emit('new:account', { id: 1 })
	})

	test('get listener counts', async (assert) => {
		const event = new Emitter(new Ioc())
		event.onAny(() => {})

		event.on('new:user', () => {})

		event.on('new:account', () => {})

		assert.equal(event.listenerCount('new:user'), 2)
		assert.equal(event.listenerCount('new:account'), 2)
		assert.equal(event.listenerCount(), 3)
	})

	test('remove any listener', async (assert) => {
		const event = new Emitter(new Ioc())
		function anyListener() {}
		event.onAny(anyListener)

		event.on('new:user', () => {})

		event.on('new:account', () => {})

		assert.equal(event.listenerCount('new:user'), 2)
		assert.equal(event.listenerCount('new:account'), 2)
		assert.equal(event.listenerCount(), 3)

		event.offAny(anyListener)
		assert.equal(event.listenerCount('new:user'), 1)
		assert.equal(event.listenerCount('new:account'), 1)
		assert.equal(event.listenerCount(), 2)
	})

	test('raise exception when registering event handler as a string without IoC container', async (assert) => {
		const event = new Emitter()
		const fn = () => event.on('new:user', 'App/Listeners/Foo')
		assert.throw(
			fn,
			'Cannot resolve string based event handler "App/Listeners/Foo". IoC container is not provided to the event emitter'
		)
	})
})

test.group('Fake Emitter', () => {
	test('collect events within memory with fake emitter', async (assert) => {
		const emitter = new FakeEmitter(new Ioc())
		await emitter.emit('new:user', { id: 1 })
		assert.deepEqual(emitter.transport.events, [{ event: 'new:user', data: { id: 1 } }])
	})
})

test.group('Events | Trap', () => {
	test('invoke trap instead of emitting event', async (assert) => {
		assert.plan(2)

		const event = new Emitter(new Ioc())
		event.on('new:user', () => {
			throw new Error('Never expected to reach')
		})

		event.trap('new:user', (data) => {
			assert.deepEqual(data, { id: 1 })
		})

		await Promise.all([event.emit('new:user', { id: 1 }), event.emit('new:user', { id: 1 })])
		event.restore()
	})

	test('invoke trap all instead of emitting event', async (assert) => {
		assert.plan(4)

		const event = new Emitter(new Ioc())
		event.on('new:user', () => {
			throw new Error('Never expected to reach')
		})

		event.trapAll((name, data) => {
			assert.equal(name, 'new:user')
			assert.deepEqual(data, { id: 1 })
		})

		await Promise.all([event.emit('new:user', { id: 1 }), event.emit('new:user', { id: 1 })])
		event.restore()
	})

	test('remove trap', async (assert) => {
		assert.plan(2)

		const event = new Emitter(new Ioc())
		event.on('new:user', (data) => {
			assert.deepEqual(data, { id: 1 })
		})

		event.trapAll(() => {
			throw new Error('Never expected to reach')
		})

		event.restore()
		await Promise.all([event.emit('new:user', { id: 1 }), event.emit('new:user', { id: 1 })])
	})
})

test.group('Emitter IoC reference', () => {
	test('define string based event listener', async (assert) => {
		assert.plan(3)
		class MyListeners {
			public newUser(data) {
				assert.deepEqual(data, { id: 1 })
			}
		}

		const ioc = new Ioc()
		ioc.bind('App/Listeners/MyListeners', () => {
			return new MyListeners()
		})

		const event = new Emitter(ioc)
		event.on('new:user', 'MyListeners.newUser')
		await event.emit('new:user', { id: 1 })

		assert.equal(event['iocResolver']!['eventHandlers'].get('new:user')!.size, 1)
		assert.equal(event.listenerCount(), 1)
	})

	test('remove string based event listener', async (assert) => {
		assert.plan(3)
		class MyListeners {
			public newUser(data) {
				assert.deepEqual(data, { id: 1 })

				/**
				 * Make sure multiple off calls is a noop
				 */
				event.off('new:user', 'MyListeners.newUser')
				event.off('new:user', 'MyListeners.newUser')
				event.off('new:user', 'MyListeners.newUser')
			}
		}

		const ioc = new Ioc()
		ioc.bind('App/Listeners/MyListeners', () => {
			return new MyListeners()
		})

		const event = new Emitter(ioc)
		event.on('new:user', 'MyListeners.newUser')
		await event.emit('new:user', { id: 1 })
		await event.emit('new:user', { id: 1 })

		assert.equal(event['iocResolver']!['eventHandlers'].get('new:user')!.size, 0)
		assert.equal(event.listenerCount(), 0)
	})

	test('multiple same event listeners must result in a noop', async (assert) => {
		assert.plan(3)
		class MyListeners {
			public newUser(data) {
				assert.deepEqual(data, { id: 1 })
			}
		}

		const ioc = new Ioc()
		ioc.bind('App/Listeners/MyListeners', () => {
			return new MyListeners()
		})

		const event = new Emitter(ioc)
		event.on('new:user', 'MyListeners.newUser')
		event.on('new:user', 'MyListeners.newUser')
		event.on('new:user', 'MyListeners.newUser')
		await event.emit('new:user', { id: 1 })

		assert.equal(event['iocResolver']!['eventHandlers'].get('new:user')!.size, 1)
		assert.equal(event.listenerCount(), 1)
	})

	test('define string based one time event listener', async (assert) => {
		assert.plan(3)

		class MyListeners {
			public newUser(data) {
				assert.deepEqual(data, { id: 1 })
			}
		}

		const ioc = new Ioc()
		ioc.bind('App/Listeners/MyListeners', () => {
			return new MyListeners()
		})

		const event = new Emitter(ioc)
		event.once('new:user', 'MyListeners.newUser')
		await event.emit('new:user', { id: 1 })

		assert.equal(event['iocResolver']!['eventHandlers'].get('new:user')!.size, 0)
		assert.equal(event.listenerCount(), 0)
	})

	test('define string based wildcard event listener', async (assert) => {
		assert.plan(4)

		class MyListeners {
			public newUser(event: string, data: any) {
				assert.equal(event, 'new:user')
				assert.deepEqual(data, { id: 1 })
			}
		}

		const ioc = new Ioc()
		ioc.bind('App/Listeners/MyListeners', () => {
			return new MyListeners()
		})

		const event = new Emitter(ioc)
		event.onAny('MyListeners.newUser')
		await event.emit('new:user', { id: 1 })

		assert.equal(event['iocResolver']!['anyHandlers'].size, 1)
		assert.equal(event.listenerCount(), 1)
	})

	test('multiple string based wildcard event listeners must result in a noop', async (assert) => {
		assert.plan(4)

		class MyListeners {
			public newUser(event: string, data: any) {
				assert.equal(event, 'new:user')
				assert.deepEqual(data, { id: 1 })
			}
		}

		const ioc = new Ioc()
		ioc.bind('App/Listeners/MyListeners', () => {
			return new MyListeners()
		})

		const event = new Emitter(ioc)
		event.onAny('MyListeners.newUser')
		event.onAny('MyListeners.newUser')
		event.onAny('MyListeners.newUser')

		await event.emit('new:user', { id: 1 })

		assert.equal(event['iocResolver']!['anyHandlers'].size, 1)
		assert.equal(event.listenerCount(), 1)
	})

	test('remove string based wildcard event listener', async (assert) => {
		assert.plan(4)

		class MyListeners {
			public newUser(eventName: string, data: any) {
				assert.equal(eventName, 'new:user')
				assert.deepEqual(data, { id: 1 })
				event.offAny('MyListeners.newUser')
			}
		}

		const ioc = new Ioc()

		ioc.bind('App/Listeners/MyListeners', () => {
			return new MyListeners()
		})

		const event = new Emitter(ioc)
		event.onAny('MyListeners.newUser')
		await event.emit('new:user', { id: 1 })
		await event.emit('new:user', { id: 1 })
		await event.emit('new:user', { id: 1 })

		assert.equal(event['iocResolver']!['anyHandlers'].size, 0)
		assert.equal(event.listenerCount(), 0)
	})
})
