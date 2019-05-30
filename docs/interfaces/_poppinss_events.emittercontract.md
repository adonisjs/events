[@poppinss/events](../README.md) > [@poppinss/events](../modules/_poppinss_events.md) > [EmitterContract](../interfaces/_poppinss_events.emittercontract.md)

# Interface: EmitterContract

Shape of Event emitter

## Type parameters
#### EventsMap :  `any`
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
* [for](_poppinss_events.emittercontract.md#for)
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

▸ **clearListener**(event: *`string`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

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

▸ **for**<`EventName`>(event: *`EventName`*): [TypedEmitterContract](_poppinss_events.typedemittercontract.md)<`EventsMap[EventName]`>

**Type parameters:**

#### EventName :  `keyof EventsMap`
**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `EventName` |

**Returns:** [TypedEmitterContract](_poppinss_events.typedemittercontract.md)<`EventsMap[EventName]`>

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

▸ **off**(event: *`string`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

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

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**(event: *`string`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `this`

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

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *`string`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `this`

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** `this`

___

