/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import diagnostics_channel from 'node:diagnostics_channel'
import { type EventDispatchData } from './types.ts'

/**
 * Traces event.emit method calls
 */
export const eventDispatch = diagnostics_channel.tracingChannel<
  'adonisjs.event.dispatch',
  EventDispatchData
>('adonisjs.event.dispatch')
