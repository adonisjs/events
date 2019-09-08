/**
 * @module @adonisjs/events
 */

/*
* @adonisjs/events
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/// <reference path="../../adonis-typings/events.ts" />

import { IocContract } from '@adonisjs/fold'
import { IoCResolver as BaseResolver } from '@poppinss/utils'
import { AnyHandler, EventHandler } from '@ioc:Adonis/Core/Event'

/**
 * Resolves string based event listeners from the IoC container. Also this method wraps
 * the IoC container bindings in a closure. That closure is later used to remove
 * the event listeners properly.
 */
export class IocResolver {
  private _eventHandlers: Map<string, Map<string, EventHandler>> = new Map()
  private _anyHandlers: Map<string, AnyHandler> = new Map()
  private _resolver: BaseResolver
  private _namespace?: string

  constructor (container: IocContract) {
    this._resolver = new BaseResolver(container, 'eventListeners', 'App/Listeners')
  }

  /**
   * Returns the listener by resolving the namespace from the IoC container
   */
  private _getReferenceListener (handler: string) {
    return (...args: any[]) => {
      return (this._resolver as BaseResolver).call(handler, this._namespace, args)
    }
  }

  /**
   * Returns all handlers for a given event.
   */
  private _getHandlersFor (event: string) {
    if (!this._eventHandlers.has(event)) {
      this._eventHandlers.set(event, new Map())
    }

    return this._eventHandlers.get(event)!
  }

  /**
   * Define custom namespace for Event listeners
   */
  public namespace (namespace: string) {
    this._namespace = namespace
  }

  /**
   * Returns event handler callback for an IoC container string reference.
   * Adding same handler for the same event is noop.
   */
  public getEventHandler (event: string, handler: string): EventHandler {
    const handlers = this._getHandlersFor(event)

    /**
     * Return the existing handler when same handler for the
     * same event already exists.
     *
     * Emittery will also re-use the same handler. So it is a noop
     * everywhere.
     */
    if (handlers.has(handler)) {
      return handlers.get(handler)!
    }

    const eventHandler = this._getReferenceListener(handler) as EventHandler

    /**
     * Store reference to the handler, so that we can clean it off
     * later.
     */
    handlers.set(handler, eventHandler)

    return eventHandler
  }

  /**
   * Removes the event handler from the tracked list and also returns
   * it back.
   */
  public removeEventHandler (event: string, handler: string): EventHandler | null {
    const handlers = this._getHandlersFor(event)

    const eventHandler = handlers.get(handler)
    if (eventHandler) {
      handlers.delete(handler)
      return eventHandler
    }

    return null
  }

  /**
   * Returns Event handler for wildcard events. Adding the same
   * handler for multiple times is a noop.
   */
  public getAnyHandler (handler: string): AnyHandler {
    if (this._anyHandlers.has(handler)) {
      return this._anyHandlers.get(handler)!
    }

    const eventHandler = this._getReferenceListener(handler) as AnyHandler
    this._anyHandlers.set(handler, eventHandler)
    return eventHandler
  }

  /**
   * Removes and returns the handler for a string reference.
   */
  public removeAnyHandler (handler: string): AnyHandler | null {
    const anyHandler = this._anyHandlers.get(handler)
    if (anyHandler) {
      this._anyHandlers.delete(handler)
      return anyHandler
    }

    return null
  }
}
