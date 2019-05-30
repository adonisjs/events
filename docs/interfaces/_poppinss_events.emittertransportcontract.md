[@poppinss/events](../README.md) > [@poppinss/events](../modules/_poppinss_events.md) > [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)

# Interface: EmitterTransportContract

The shape of emitter transport. This has to be same as `emittery`.

## Hierarchy

**EmitterTransportContract**

## Implemented by

* [MemoryTransport](../classes/_poppinss_events.memorytransport.md)

## Index

### Methods

* [clearListeners](_poppinss_events.emittertransportcontract.md#clearlisteners)
* [emit](_poppinss_events.emittertransportcontract.md#emit)
* [listenerCount](_poppinss_events.emittertransportcontract.md#listenercount)
* [off](_poppinss_events.emittertransportcontract.md#off)
* [offAny](_poppinss_events.emittertransportcontract.md#offany)
* [on](_poppinss_events.emittertransportcontract.md#on)
* [onAny](_poppinss_events.emittertransportcontract.md#onany)
* [once](_poppinss_events.emittertransportcontract.md#once)

---

## Methods

<a id="clearlisteners"></a>

###  clearListeners

▸ **clearListeners**(event?: *`undefined` \| `string`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | `undefined` \| `string` |

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
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(event?: *`undefined` \| `string`*): `number`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | `undefined` \| `string` |

**Returns:** `number`

___
<a id="off"></a>

###  off

▸ **off**(event: *`string`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

▸ **off**(event: *`string`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** `void`

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

▸ **on**(event: *`string`*, handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** `void`

___
<a id="onany"></a>

###  onAny

▸ **onAny**(handler: *[AnyHandler](../modules/_poppinss_events.md#anyhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** `void`

___
<a id="once"></a>

###  once

▸ **once**(event: *`string`*): `Promise`<`any`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |

**Returns:** `Promise`<`any`>

___

