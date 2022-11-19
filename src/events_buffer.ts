/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { BufferedEventsListItem } from './types.js'

/**
 * Exposes API to filter, find events from the events buffer.
 */
export class EventsBuffer<EventsList extends Record<string | symbol | number, any>> {
  events: BufferedEventsListItem<EventsList>[] = []

  /**
   * Get all the emitted events
   */
  all() {
    return this.events
  }

  /**
   * Returns the size of captured events
   */
  size() {
    return this.events.length
  }

  /**
   * Find if an event was emitted
   */
  exists(
    finder: keyof EventsList | ((event: BufferedEventsListItem<EventsList>) => boolean)
  ): boolean {
    return !!this.find(finder)
  }

  /**
   * Get selected events
   */
  filter(
    finder: keyof EventsList | ((event: BufferedEventsListItem<EventsList>) => boolean)
  ): BufferedEventsListItem<EventsList>[] {
    if (typeof finder === 'function') {
      return this.events.filter(finder)
    }

    return this.events.filter((event) => event.name === finder)
  }

  /**
   * Find a specific event
   */
  find(
    finder: keyof EventsList | ((event: BufferedEventsListItem<EventsList>) => boolean)
  ): BufferedEventsListItem<EventsList> | null {
    if (typeof finder === 'function') {
      return this.events.find(finder) || null
    }

    return this.events.find((event) => event.name === finder) || null
  }

  /**
   * Flush events collected within memory
   */
  flush() {
    this.events = []
  }
}
