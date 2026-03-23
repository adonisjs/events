/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import is from '@sindresorhus/is'
import string from '@poppinss/utils/string'
import { AssertionError } from 'node:assert'
import { type Constructor } from '@poppinss/utils/types'

import type { AllowedEventTypes, BufferedEvent, BufferedEventsList } from './types.ts'

/**
 * Callback function to narrow down an event from
 * the events buffer list
 */
type EventFinderCallback<
  EventsList extends Record<string | symbol | number, any>,
  Event extends keyof EventsList | Constructor<any>,
> = (
  event: Event extends keyof EventsList
    ? BufferedEvent<Event, EventsList[Event]>
    : Event extends Constructor<infer A>
      ? BufferedEvent<Event, A>
      : never
) => boolean

/**
 * Exposes API to filter, find events from the events buffer.
 */
export class EventsBuffer<EventsList extends Record<string | symbol | number, any>> {
  /**
   * Buffered events
   */
  #events: BufferedEventsList<EventsList>[] = []

  /**
   * Function to call when disposing the buffer to restore
   * the emitter to its original state
   */
  #restoreFn: () => void

  constructor(restoreFn: () => void) {
    this.#restoreFn = restoreFn
  }

  /**
   * Track emitted event
   *
   * @param event - The event that was emitted
   * @param data - The data passed with the event
   */
  add<Name extends AllowedEventTypes>(event: Name, data: any): void {
    this.#events.push({ event: event as any, data })
  }

  /**
   * Get all the emitted events
   *
   * @returns Array of all buffered events
   */
  all(): BufferedEventsList<EventsList>[] {
    return this.#events
  }

  /**
   * Returns the size of captured events
   *
   * @returns The number of captured events
   */
  size(): number {
    return this.#events.length
  }

  /**
   * Find if an event was emitted
   *
   * @param event - The event to check for
   * @param finder - Optional callback to filter specific event instances
   * @returns True if the event was emitted
   */
  exists<Event extends keyof EventsList | Constructor<any>>(
    event: Event,
    finder?: EventFinderCallback<EventsList, Event>
  ): boolean {
    return !!this.find(event, finder)
  }

  /**
   * Find a specific event
   *
   * @param event - The event to find
   * @param finder - Optional callback to filter specific event instances
   * @returns The found event or null
   */
  find<Event extends keyof EventsList | Constructor<any>>(
    event: Event,
    finder?: EventFinderCallback<EventsList, Event>
  ):
    | (Event extends keyof EventsList
        ? BufferedEvent<Event, EventsList[Event]>
        : Event extends Constructor<infer A>
          ? BufferedEvent<Event, A>
          : never)
    | null {
    return (this.#events.find((bufferedEvent) => {
      if (!finder) {
        return bufferedEvent.event === event
      }

      return (
        bufferedEvent.event === event &&
        finder(bufferedEvent as Parameters<EventFinderCallback<EventsList, Event>>[0])
      )
    }) || null) as any
  }

  /**
   * Assert a given event has been emitted
   *
   * @param event - The event to assert was emitted
   * @param finder - Optional callback to filter specific event instances
   * @throws AssertionError if the event was not emitted
   */
  assertEmitted<Event extends keyof EventsList | Constructor<any>>(
    event: Event,
    finder?: EventFinderCallback<EventsList, Event>
  ): void {
    const hasEvent = this.exists(event, finder)

    if (!hasEvent) {
      const message = is.class(event)
        ? `Expected "[class ${event.name}]" event to be emitted`
        : `Expected "${String(event)}" event to be emitted`

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
   * Assert number of times an event has been emitted
   *
   * @param event - The event to check emission count for
   * @param count - The expected number of emissions
   * @throws AssertionError if the count doesn't match
   */
  assertEmittedCount<Event extends keyof EventsList | Constructor<any>>(
    event: Event,
    count: number
  ): void {
    const actual = this.all().filter((bufferedEvent) => bufferedEvent.event === event).length

    if (actual !== count) {
      const eventName = is.class(event) ? `[class ${event.name}]` : String(event)
      throw new AssertionError({
        message: `Expected "${eventName}" event to be emitted "${count}" ${string.pluralize(
          'time',
          count
        )}, instead it was emitted "${actual}" ${string.pluralize('time', actual)}`,
        actual,
        expected: count,
      })
    }
  }

  /**
   * Assert a given event has been not been emitted
   *
   * @param event - The event to assert was not emitted
   * @param finder - Optional callback to filter specific event instances
   * @throws AssertionError if the event was emitted
   */
  assertNotEmitted<Event extends keyof EventsList | Constructor<any>>(
    event: Event,
    finder?: EventFinderCallback<EventsList, Event>
  ): void {
    const hasEvent = this.exists(event, finder)

    if (hasEvent) {
      const isClass = is.class(event)
      const message = isClass
        ? `Unexpected "[class ${event.name}]" event was emitted`
        : `Unexpected "${String(event)}" event was emitted`

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
   * Assert no events have been emitted
   *
   * @throws AssertionError if any events were emitted
   */
  assertNoneEmitted(): void {
    const eventsSize = this.size()
    if (eventsSize > 0) {
      throw new AssertionError(
        Object.assign(
          {
            message: `Expected zero events to be emitted. Instead received "${eventsSize}" ${string.pluralize(
              'event',
              eventsSize
            )}`,
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
  flush(): void {
    this.#events = []
  }

  [Symbol.dispose](): void {
    this.#restoreFn()
  }
}
