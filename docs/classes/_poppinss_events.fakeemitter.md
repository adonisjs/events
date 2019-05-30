[@poppinss/events](../README.md) > [@poppinss/events](../modules/_poppinss_events.md) > [FakeEmitter](../classes/_poppinss_events.fakeemitter.md)

# Class: FakeEmitter

Fake emitter with memory transport to be used during testing.

## Type parameters
#### T :  `any`
## Hierarchy

 [Emitter](_poppinss_events.emitter.md)<`T`>

**↳ FakeEmitter**

## Implements

* [EmitterContract](../interfaces/_poppinss_events.emittercontract.md)<`T`>

## Index

### Properties

* [transport](_poppinss_events.fakeemitter.md#transport)

### Accessors

* [events](_poppinss_events.fakeemitter.md#events)

### Methods

* [clear](_poppinss_events.fakeemitter.md#clear)
* [clearAllListeners](_poppinss_events.fakeemitter.md#clearalllisteners)
* [clearListener](_poppinss_events.fakeemitter.md#clearlistener)
* [clearListeners](_poppinss_events.fakeemitter.md#clearlisteners)
* [emit](_poppinss_events.fakeemitter.md#emit)
* [hasListeners](_poppinss_events.fakeemitter.md#haslisteners)
* [listenerCount](_poppinss_events.fakeemitter.md#listenercount)
* [namespace](_poppinss_events.fakeemitter.md#namespace)
* [off](_poppinss_events.fakeemitter.md#off)
* [offAny](_poppinss_events.fakeemitter.md#offany)
* [on](_poppinss_events.fakeemitter.md#on)
* [onAny](_poppinss_events.fakeemitter.md#onany)
* [once](_poppinss_events.fakeemitter.md#once)

---

## Properties

<a id="transport"></a>

###  transport

**● transport**: *[MemoryTransport](_poppinss_events.memorytransport.md)* =  new MemoryTransport()

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

▸ **clearListener**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string`*): `void`

▸ **clearListener**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string`*): `void`

Remove existing event listener.

*__alias__*: off

**Type parameters:**

#### K :  `keyof T`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string` |

**Returns:** `void`

**Type parameters:**

#### K :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string` |

**Returns:** `void`

___
<a id="clearlisteners"></a>

###  clearListeners

▸ **clearListeners**<`K`>(event: *`K`*): `void`

▸ **clearListeners**<`K`>(event: *`K`*): `void`

Clear all listeners for a given event

**Type parameters:**

#### K :  `keyof T`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |

**Returns:** `void`

**Type parameters:**

#### K :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |

**Returns:** `void`

___
<a id="emit"></a>

###  emit

▸ **emit**<`K`>(event: *`K`*, data: *`T[K]`*): `Promise`<`void`>

▸ **emit**<`K`>(event: *`K`*, data: *`T[K]`*): `Promise`<`void`>

Emit event

**Type parameters:**

#### K :  `keyof T`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| data | `T[K]` |

**Returns:** `Promise`<`void`>

**Type parameters:**

#### K :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| data | `T[K]` |

**Returns:** `Promise`<`void`>

___
<a id="haslisteners"></a>

###  hasListeners

▸ **hasListeners**<`K`>(event?: *[K]()*): `boolean`

▸ **hasListeners**<`K`>(event?: *[K]()*): `boolean`

Returns a boolean telling if listeners count for a given event or all events is greater than 0 or not.

**Type parameters:**

#### K :  `keyof T`
**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | [K]() |

**Returns:** `boolean`

**Type parameters:**

#### K :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | [K]() |

**Returns:** `boolean`

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**<`K`>(event?: *[K]()*): `number`

▸ **listenerCount**<`K`>(event?: *[K]()*): `number`

Returns count of listeners for a given event or all events.

**Type parameters:**

#### K :  `keyof T`
**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | [K]() |

**Returns:** `number`

**Type parameters:**

#### K :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | [K]() |

**Returns:** `number`

___
<a id="namespace"></a>

###  namespace

▸ **namespace**(namespace: *`string`*): `this`

Define custom namespace for event listeners. It is set to `App/Listeners` by default.

**Parameters:**

| Name | Type |
| ------ | ------ |
| namespace | `string` |

**Returns:** `this`

___
<a id="off"></a>

###  off

▸ **off**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string`*): `void`

▸ **off**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string`*): `void`

Remove existing event listener

**Type parameters:**

#### K :  `keyof T`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string` |

**Returns:** `void`

**Type parameters:**

#### K :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string` |

**Returns:** `void`

___
<a id="offany"></a>

###  offAny

▸ **offAny**(handler: *[AnyHandler](../modules/_poppinss_events.md#anyhandler) \| `string`*): `void`

Remove existing event listener for catch all handler

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_poppinss_events.md#anyhandler) \| `string` |

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string`*): `this`

▸ **on**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string`*): `this`

Define event handler for a given event

**Type parameters:**

#### K :  `keyof T`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string` |

**Returns:** `this`

**Type parameters:**

#### K :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string` |

**Returns:** `this`

___
<a id="onany"></a>

###  onAny

▸ **onAny**(handler: *[AnyHandler](../modules/_poppinss_events.md#anyhandler) \| `string`*): `this`

Define catch all event handler to listen for all events.

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_poppinss_events.md#anyhandler) \| `string` |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string`*): `this`

▸ **once**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string`*): `this`

Define event handler for a given event and to be called only once.

**Type parameters:**

#### K :  `keyof T`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string` |

**Returns:** `this`

**Type parameters:**

#### K :  `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string` |

**Returns:** `this`

___

