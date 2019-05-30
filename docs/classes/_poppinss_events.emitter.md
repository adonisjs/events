[@poppinss/events](../README.md) > [@poppinss/events](../modules/_poppinss_events.md) > [Emitter](../classes/_poppinss_events.emitter.md)

# Class: Emitter

Emitter class exposes the API for async event emitter built on top of Emittery. It also exposes an API to pre-define the Typescript types for different events.

## Type parameters
#### T :  `any`
## Hierarchy

**Emitter**

↳  [FakeEmitter](_poppinss_events.fakeemitter.md)

## Implements

* [EmitterContract](../interfaces/_poppinss_events.emittercontract.md)<`T`>

## Index

### Properties

* [transport](_poppinss_events.emitter.md#transport)

### Methods

* [clearAllListeners](_poppinss_events.emitter.md#clearalllisteners)
* [clearListener](_poppinss_events.emitter.md#clearlistener)
* [clearListeners](_poppinss_events.emitter.md#clearlisteners)
* [emit](_poppinss_events.emitter.md#emit)
* [hasListeners](_poppinss_events.emitter.md#haslisteners)
* [listenerCount](_poppinss_events.emitter.md#listenercount)
* [namespace](_poppinss_events.emitter.md#namespace)
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

