/*
 * @adonisjs/events
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Event list item inside bufferred items
 */
export type BufferedEventsListItem<EventsList> = {
  [Name in keyof EventsList]: { name: Name; data: EventsList[Name] }
}[keyof EventsList]

/**
 * Event list item
 */
export type EventsListItem<EventsList> = {
  [Name in keyof EventsList]: EventsList[Name]
}[keyof EventsList]
