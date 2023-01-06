/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import is from '@adonisjs/application/helpers/is'
import type { AllowedEventTypes, BufferedEvent, BufferedEventsList, Constructor } from './types.js'

/**
 * Exposes API to filter, find events from the events buffer.
 */
export class EventsBuffer<EventsList extends Record<string | symbol | number, any>> {
  /**
   * Buffered events
   */
  #events: BufferedEventsList<EventsList>[] = []

  /**
   * Track emitted event
   */
  add<Name extends AllowedEventTypes>(event: Name, data: any): void {
    this.#events.push({ event: event as any, data })
  }

  /**
   * Get all the emitted events
   */
  all() {
    return this.#events
  }

  /**
   * Returns the size of captured events
   */
  size() {
    return this.#events.length
  }

  /**
   * Find if an event was emitted
   */
  exists<Event extends keyof EventsList | Constructor<any>>(
    finder: Event | ((event: BufferedEventsList<EventsList>) => boolean)
  ): boolean {
    return !!this.find(finder)
  }

  /**
   * Get selected events
   */
  filter(
    finder:
      | keyof EventsList
      | Constructor<any>
      | ((event: BufferedEventsList<EventsList>) => boolean)
  ): BufferedEventsList<EventsList>[] {
    if (typeof finder === 'function' && !is.class_(finder)) {
      return this.#events.filter(finder)
    }

    return this.#events.filter((event) => event.event === finder)
  }

  /**
   * Find a specific event
   */
  find<Event extends keyof EventsList | Constructor<any>>(
    finder: Event | ((event: BufferedEventsList<EventsList>) => boolean)
  ):
    | (Event extends keyof EventsList
        ? BufferedEvent<Event, EventsList[Event]>
        : Event extends Constructor<infer A>
        ? BufferedEvent<Event, A>
        : BufferedEventsList<EventsList>)
    | null {
    if (typeof finder === 'function' && !is.class_(finder)) {
      return (this.#events.find(finder) || null) as any
    }

    return (this.#events.find((event) => event.event === finder) || null) as any
  }

  /**
   * Flush events collected within memory
   */
  flush() {
    this.#events = []
  }
}
