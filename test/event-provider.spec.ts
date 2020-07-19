/*
 * @adonisjs/events
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import test from 'japa'
import { join } from 'path'
import { Registrar, Ioc } from '@adonisjs/fold'
import { Emitter } from '../src/Emitter'

test.group('EventProvider', () => {
	test('register event provider', async (assert) => {
		const ioc = new Ioc()
		const registrar = new Registrar(ioc, join(__dirname, '..'))

		await registrar.useProviders(['./providers/EventProvider']).registerAndBoot()

		assert.instanceOf(ioc.use('Adonis/Core/Event'), Emitter)
		assert.deepEqual(ioc.use('Adonis/Core/Event'), ioc.use('Adonis/Core/Event'))
	})
})
