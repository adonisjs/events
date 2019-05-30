[@poppinss/events](../README.md) > [@poppinss/events](../modules/_poppinss_events.md) > [EmitterContract](../interfaces/_poppinss_events.emittercontract.md)

# Interface: EmitterContract

Shape of Event emitter

## Type parameters
#### T :  `any`
## Hierarchy

**EmitterContract**

## Implemented by

* [Emitter](../classes/_poppinss_events.emitter.md)
* [FakeEmitter](../classes/_poppinss_events.fakeemitter.md)

## Index

### Properties

* [transport](_poppinss_events.emittercontract.md#transport)

### Methods

* [clearListener](_poppinss_events.emittercontract.md#clearlistener)
* [clearListeners](_poppinss_events.emittercontract.md#clearlisteners)
* [emit](_poppinss_events.emittercontract.md#emit)
* [hasListeners](_poppinss_events.emittercontract.md#haslisteners)
* [listenerCount](_poppinss_events.emittercontract.md#listenercount)
* [namespace](_poppinss_events.emittercontract.md#namespace)
* [off](_poppinss_events.emittercontract.md#off)
* [offAny](_poppinss_events.emittercontract.md#offany)
* [on](_poppinss_events.emittercontract.md#on)
* [onAny](_poppinss_events.emittercontract.md#onany)
* [once](_poppinss_events.emittercontract.md#once)

---

## Properties

<a id="transport"></a>

###  transport

**● transport**: *[EmitterTransportContract](_poppinss_events.emittertransportcontract.md)*

___

## Methods

<a id="clearlistener"></a>

###  clearListener

▸ **clearListener**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string`*): `void`

▸ **clearListener**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string`*): `void`

▸ **clearListener**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string`*): `void`

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

**Type parameters:**

#### K :  `keyof T` \| `string`
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

▸ **clearListeners**<`K`>(event: *`K`*): `void`

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

**Type parameters:**

#### K :  `keyof T` \| `string`
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

▸ **emit**<`K`>(event: *`K`*, data: *`T[K]`*): `Promise`<`void`>

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

**Type parameters:**

#### K :  `keyof T` \| `string`
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

▸ **hasListeners**<`K`>(event?: *[K]()*): `boolean`

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

**Type parameters:**

#### K :  `keyof T` \| `string`
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

▸ **listenerCount**<`K`>(event?: *[K]()*): `number`

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

**Type parameters:**

#### K :  `keyof T` \| `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | [K]() |

**Returns:** `number`

___
<a id="namespace"></a>

###  namespace

▸ **namespace**(namespace: *`string`*): `this`

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

▸ **off**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string`*): `void`

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

**Type parameters:**

#### K :  `keyof T` \| `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) \| `string` |

**Returns:** `void`

___
<a id="offany"></a>

###  offAny

▸ **offAny**(handler: *[AnyHandler](../modules/_poppinss_events.md#anyhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string`*): `this`

▸ **on**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string`*): `this`

▸ **on**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string`*): `this`

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

**Type parameters:**

#### K :  `keyof T` \| `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string` |

**Returns:** `this`

___
<a id="onany"></a>

###  onAny

▸ **onAny**(handler: *[AnyHandler](../modules/_poppinss_events.md#anyhandler)*): `this`

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string`*): `this`

▸ **once**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string`*): `this`

▸ **once**<`K`>(event: *`K`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string`*): `this`

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

**Type parameters:**

#### K :  `keyof T` \| `string`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `K` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler)<`T[K]`> \| `string` |

**Returns:** `this`

___

