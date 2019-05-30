[@poppinss/events](../README.md) > ["src/FakeEmitter/index"](../modules/_src_fakeemitter_index_.md) > [FakeEmitter](../classes/_src_fakeemitter_index_.fakeemitter.md)

# Class: FakeEmitter

Fake emitter with memory transport to be used during testing.

## Type parameters
#### EventsMap :  `any`
## Hierarchy

 [Emitter](_src_emitter_index_.emitter.md)

**↳ FakeEmitter**

## Implements

* [EmitterContract](../interfaces/_src_contracts_.emittercontract.md)<`EventsMap`>

## Index

### Properties

* [transport](_src_fakeemitter_index_.fakeemitter.md#transport)

### Accessors

* [events](_src_fakeemitter_index_.fakeemitter.md#events)

### Methods

* [clear](_src_fakeemitter_index_.fakeemitter.md#clear)
* [clearAllListeners](_src_fakeemitter_index_.fakeemitter.md#clearalllisteners)
* [clearListener](_src_fakeemitter_index_.fakeemitter.md#clearlistener)
* [clearListeners](_src_fakeemitter_index_.fakeemitter.md#clearlisteners)
* [emit](_src_fakeemitter_index_.fakeemitter.md#emit)
* [for](_src_fakeemitter_index_.fakeemitter.md#for)
* [hasListeners](_src_fakeemitter_index_.fakeemitter.md#haslisteners)
* [listenerCount](_src_fakeemitter_index_.fakeemitter.md#listenercount)
* [off](_src_fakeemitter_index_.fakeemitter.md#off)
* [offAny](_src_fakeemitter_index_.fakeemitter.md#offany)
* [on](_src_fakeemitter_index_.fakeemitter.md#on)
* [onAny](_src_fakeemitter_index_.fakeemitter.md#onany)
* [once](_src_fakeemitter_index_.fakeemitter.md#once)

---

## Properties

<a id="transport"></a>

###  transport

**● transport**: *[MemoryTransport](_src_transports_memory_.memorytransport.md)* =  new MemoryTransport()

___

## Accessors

<a id="events"></a>

###  events

**get events**(): `object`[]

Returns in memory events from transport

**Returns:** `object`[]

___

## Methods

<a id="clear"></a>

###  clear

▸ **clear**(): `void`

Clear in memory events

**Returns:** `void`

___
<a id="clearalllisteners"></a>

###  clearAllListeners

▸ **clearAllListeners**(): `void`

Clear all listeners for all events

**Returns:** `void`

___
<a id="clearlistener"></a>

###  clearListener

▸ **clearListener**(event: *`string`*, handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

Remove existing event listener.

*__alias__*: off

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

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

▸ **for**<`EventName`>(event: *`EventName`*): [TypedEmitter](_src_emitter_typedemitter_.typedemitter.md)<`EventsMap[EventName]`>

Returns instance of a typed emitter. Make sure the event name is already pre-defined inside `EventsMap` type.

**Type parameters:**

#### EventName :  `keyof EventsMap`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `EventName` |

**Returns:** [TypedEmitter](_src_emitter_typedemitter_.typedemitter.md)<`EventsMap[EventName]`>

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

▸ **off**(event: *`string`*, handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

Remove existing event listener

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

**Returns:** `void`

___
<a id="offany"></a>

###  offAny

▸ **offAny**(handler: *[AnyHandler](../modules/_src_contracts_.md#anyhandler)*): `void`

Remove existing event listener for catch all handler

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_src_contracts_.md#anyhandler) |

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**(event: *`string`*, handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `this`

Define event handler for a given event

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

**Returns:** `this`

___
<a id="onany"></a>

###  onAny

▸ **onAny**(handler: *[AnyHandler](../modules/_src_contracts_.md#anyhandler)*): `this`

Define catch all event handler to listen for all events.

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_src_contracts_.md#anyhandler) |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *`string`*, handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `this`

Define event handler for a given event and to be called only once.

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

**Returns:** `this`

___

