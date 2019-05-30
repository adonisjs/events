[@poppinss/events](../README.md) > ["src/contracts"](../modules/_src_contracts_.md) > [EmitterContract](../interfaces/_src_contracts_.emittercontract.md)

# Interface: EmitterContract

Shape of Event emitter

## Type parameters
#### EventsMap :  `any`
## Hierarchy

**EmitterContract**

## Implemented by

* [Emitter](../classes/_src_emitter_index_.emitter.md)
* [FakeEmitter](../classes/_src_fakeemitter_index_.fakeemitter.md)

## Index

### Properties

* [transport](_src_contracts_.emittercontract.md#transport)

### Methods

* [clearListener](_src_contracts_.emittercontract.md#clearlistener)
* [clearListeners](_src_contracts_.emittercontract.md#clearlisteners)
* [emit](_src_contracts_.emittercontract.md#emit)
* [for](_src_contracts_.emittercontract.md#for)
* [hasListeners](_src_contracts_.emittercontract.md#haslisteners)
* [listenerCount](_src_contracts_.emittercontract.md#listenercount)
* [off](_src_contracts_.emittercontract.md#off)
* [offAny](_src_contracts_.emittercontract.md#offany)
* [on](_src_contracts_.emittercontract.md#on)
* [onAny](_src_contracts_.emittercontract.md#onany)
* [once](_src_contracts_.emittercontract.md#once)

---

## Properties

<a id="transport"></a>

###  transport

**● transport**: *[EmitterTransportContract](_src_contracts_.emittertransportcontract.md)*

___

## Methods

<a id="clearlistener"></a>

###  clearListener

▸ **clearListener**(event: *`string`*, handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

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

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |

**Returns:** `void`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *`string`*, data: *`any`*): `Promise`<`void`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| data | `any` |

**Returns:** `Promise`<`void`>

___
<a id="for"></a>

###  for

▸ **for**<`EventName`>(event: *`EventName`*): [TypedEmitter](_src_contracts_.typedemitter.md)<`EventsMap[EventName]`>

**Type parameters:**

#### EventName :  `keyof EventsMap`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `EventName` |

**Returns:** [TypedEmitter](_src_contracts_.typedemitter.md)<`EventsMap[EventName]`>

___
<a id="haslisteners"></a>

###  hasListeners

▸ **hasListeners**(event: *`string`*): `boolean`

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |

**Returns:** `boolean`

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(event: *`string`*): `number`

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |

**Returns:** `number`

___
<a id="off"></a>

###  off

▸ **off**(event: *`string`*, handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

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

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_src_contracts_.md#anyhandler) |

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**(event: *`string`*, handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `this`

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

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_src_contracts_.md#anyhandler) |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *`string`*, handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `this`

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

**Returns:** `this`

___

