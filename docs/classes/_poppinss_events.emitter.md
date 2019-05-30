[@poppinss/events](../README.md) > [@poppinss/events](../modules/_poppinss_events.md) > [Emitter](../classes/_poppinss_events.emitter.md)

# Class: Emitter

Emitter class exposes the API for async event emitter built on top of Emittery. It also exposes an API to pre-define the Typescript types for different events.

## Type parameters
#### EventsMap :  `any`
## Hierarchy

**Emitter**

↳  [FakeEmitter](_poppinss_events.fakeemitter.md)

## Implements

* [EmitterContract](../interfaces/_poppinss_events.emittercontract.md)<`EventsMap`>

## Index

### Properties

* [transport](_poppinss_events.emitter.md#transport)

### Methods

* [clearAllListeners](_poppinss_events.emitter.md#clearalllisteners)
* [clearListener](_poppinss_events.emitter.md#clearlistener)
* [clearListeners](_poppinss_events.emitter.md#clearlisteners)
* [emit](_poppinss_events.emitter.md#emit)
* [for](_poppinss_events.emitter.md#for)
* [hasListeners](_poppinss_events.emitter.md#haslisteners)
* [listenerCount](_poppinss_events.emitter.md#listenercount)
* [off](_poppinss_events.emitter.md#off)
* [offAny](_poppinss_events.emitter.md#offany)
* [on](_poppinss_events.emitter.md#on)
* [onAny](_poppinss_events.emitter.md#onany)
* [once](_poppinss_events.emitter.md#once)

---

## Properties

<a id="transport"></a>

###  transport

**● transport**: *[EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)* =  new Emittery()

___

## Methods

<a id="clearalllisteners"></a>

###  clearAllListeners

▸ **clearAllListeners**(): `void`

Clear all listeners for all events

**Returns:** `void`

___
<a id="clearlistener"></a>

###  clearListener

▸ **clearListener**(event: *`string`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

Remove existing event listener.

*__alias__*: off

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** `void`

___
<a id="clearlisteners"></a>

###  clearListeners

▸ **clearListeners**(event: *`string`*): `void`

Clear all listeners for a given event

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |

**Returns:** `void`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *`string`*, data: *`any`*): `Promise`<`void`>

Emit event

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| data | `any` |

**Returns:** `Promise`<`void`>

___
<a id="for"></a>

###  for

▸ **for**<`EventName`>(event: *`EventName`*): [TypedEmitter](_poppinss_events.typedemitter.md)<`EventsMap[EventName]`>

Returns instance of a typed emitter. Make sure the event name is already pre-defined inside `EventsMap` type.

**Type parameters:**

#### EventName :  `keyof EventsMap`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `EventName` |

**Returns:** [TypedEmitter](_poppinss_events.typedemitter.md)<`EventsMap[EventName]`>

___
<a id="haslisteners"></a>

###  hasListeners

▸ **hasListeners**(event?: *`undefined` \| `string`*): `boolean`

Returns a boolean telling if listeners count for a given event or all events is greater than 0 or not.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | `undefined` \| `string` |

**Returns:** `boolean`

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(event?: *`undefined` \| `string`*): `number`

Returns count of listeners for a given event or all events.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | `undefined` \| `string` |

**Returns:** `number`

___
<a id="off"></a>

###  off

▸ **off**(event: *`string`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

Remove existing event listener

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** `void`

___
<a id="offany"></a>

###  offAny

▸ **offAny**(handler: *[AnyHandler](../modules/_poppinss_events.md#anyhandler)*): `void`

Remove existing event listener for catch all handler

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**(event: *`string`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `this`

Define event handler for a given event

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** `this`

___
<a id="onany"></a>

###  onAny

▸ **onAny**(handler: *[AnyHandler](../modules/_poppinss_events.md#anyhandler)*): `this`

Define catch all event handler to listen for all events.

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *`string`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `this`

Define event handler for a given event and to be called only once.

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** `this`

___
