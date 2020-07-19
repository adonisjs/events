/*
 * @adonisjs/events
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare module '@ioc:Adonis/Core/Event' {
	/**
	 * Shape of event handler
	 */
	export type EventHandler<T extends any = any> = (data: T) => Promise<void> | void

	/**
	 * Shape of catch all events handler
	 */
	export interface AnyHandler {
		<K extends keyof EventsList>(event: K, data: EventsList[K]): Promise<void> | void
		<K extends string>(event: K, data: DataForEvent<K>): Promise<void> | void
	}

	/**
	 * Returns the data type for a given key
	 */
	export type DataForEvent<K extends string> = K extends keyof EventsList ? EventsList[K] : any

	/**
	 * The shape of emitter transport. This has to be same as
	 * `emittery`.
	 */
	export interface EmitterTransportContract {
		on(event: string | symbol, handler: EventHandler): any
		once(event: string | symbol): Promise<any>
		onAny(handler: AnyHandler): any
		emit(event: string | symbol, data: any): Promise<any>
		off(event: string | symbol, handler: EventHandler): any
		offAny(handler: AnyHandler): any
		off(event: string | symbol, handler: EventHandler): any
		clearListeners(event?: string | symbol): any
		listenerCount(event?: string | symbol): number
	}

	/**
	 * Shape of Event emitter
	 */
	export interface EmitterContract {
		transport: EmitterTransportContract

		/**
		 * Define a custom IoC Container base namespace for resolving
		 * the listener bindings.
		 */
		namespace(namespace: string): this

		/**
		 * Listen for an event
		 */
		on<K extends keyof EventsList>(event: K, handler: EventHandler<EventsList[K]> | string): this
		on<K extends string>(event: K, handler: EventHandler<DataForEvent<K>> | string): this

		/**
		 * Listen for an event only once
		 */
		once<K extends keyof EventsList>(event: K, handler: EventHandler<EventsList[K]> | string): this
		once<K extends string>(event: K, handler: EventHandler<DataForEvent<K>> | string): this

		/**
		 * Listen for all events
		 */
		onAny(handler: AnyHandler): this

		/**
		 * Emit an event
		 */
		emit<K extends keyof EventsList>(event: K, data: EventsList[K]): Promise<void>
		emit<K extends string>(event: K, data: DataForEvent<K>): Promise<void>

		/**
		 * Remove event listener
		 */
		off<K extends keyof EventsList>(event: K, handler: EventHandler | string): void
		off<K extends string>(event: K, handler: EventHandler | string): void

		/**
		 * Remove event listener listening for all events
		 */
		offAny(handler: AnyHandler): void

		/**
		 * Clear a given listener for a given event
		 */
		clearListener<K extends keyof EventsList>(event: K, handler: EventHandler | string): void
		clearListener<K extends string>(event: K, handler: EventHandler | string): void

		/**
		 * Clear all listeners for a given event
		 */
		clearListeners<K extends keyof EventsList>(event: K): void
		clearListeners<K extends string>(event: K): void

		/**
		 * Returns count of listeners listening for a given event
		 */
		listenerCount<K extends keyof EventsList>(event?: K): number
		listenerCount<K extends string>(event?: K): number

		/**
		 * Returns true when an event has one or more listeners
		 */
		hasListeners<K extends keyof EventsList>(event?: K): boolean
		hasListeners<K extends string>(event?: K): boolean
	}

	/**
	 * An interface to define typed events
	 */
	export interface EventsList {}

	const Event: EmitterContract
	export default Event
}
