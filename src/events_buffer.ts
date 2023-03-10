/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import is from '@sindresorhus/is'
import { AssertionError } from 'node:assert'
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
   * Assert a given event has been emitted
   */
  assertEmitted<Event extends keyof EventsList | Constructor<any>>(
    finder: Event | ((event: BufferedEventsList<EventsList>) => boolean)
  ): void {
    const hasEvent = this.exists(finder)

    if (!hasEvent) {
      const isClass = is.class_(finder)
      const message =
        typeof finder === 'function' && !isClass
          ? `Expected callback to find an emitted event`
          : isClass
          ? `Expected "${finder.name}" event to be emitted`
          : `Expected "${String(finder)}" event to be emitted`

      throw new AssertionError({
        message: message,
        expected: true,
        actual: false,
        operator: 'strictEqual',
        stackStartFn: this.assertEmitted,
      })
    }
  }

  /**
   * Assert a given event has been not been emitted
   */
  assertNotEmitted<Event extends keyof EventsList | Constructor<any>>(
    finder: Event | ((event: BufferedEventsList<EventsList>) => boolean)
  ): void {
    const hasEvent = this.exists(finder)

    if (hasEvent) {
      const isClass = is.class_(finder)
      const message =
        typeof finder === 'function' && !isClass
          ? `Expected callback to not find any event`
          : isClass
          ? `Expected "${finder.name}" event to be not emitted`
          : `Expected "${String(finder)}" event to be not emitted`

      throw new AssertionError({
        message: message,
        expected: false,
        actual: true,
        operator: 'strictEqual',
        stackStartFn: this.assertNotEmitted,
      })
    }
  }

  /**
   * Assert a given event has been not been emitted
   */
  assertNoneEmitted(): void {
    const eventsSize = this.size()
    if (eventsSize > 0) {
      throw new AssertionError(
        Object.assign(
          {
            message: `Expected zero events to be emitted. Instead received "${eventsSize}" event(s)`,
            expected: 0,
            actual: eventsSize,
            operator: 'strictEqual',
            stackStartFn: this.assertNoneEmitted,
          },
          {
            showDiff: true,
          }
        )
      )
    }
  }

  /**
   * Flush events collected within memory
   */
  flush() {
    this.#events = []
  }
}
