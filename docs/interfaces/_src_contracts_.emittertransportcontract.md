[@poppinss/events](../README.md) > ["src/contracts"](../modules/_src_contracts_.md) > [EmitterTransportContract](../interfaces/_src_contracts_.emittertransportcontract.md)

# Interface: EmitterTransportContract

The shape of emitter transport. This has to be same as `emittery`.

## Hierarchy

**EmitterTransportContract**

## Implemented by

* [MemoryTransport](../classes/_src_transports_memory_.memorytransport.md)

## Index

### Methods

* [clearListeners](_src_contracts_.emittertransportcontract.md#clearlisteners)
* [emit](_src_contracts_.emittertransportcontract.md#emit)
* [listenerCount](_src_contracts_.emittertransportcontract.md#listenercount)
* [off](_src_contracts_.emittertransportcontract.md#off)
* [offAny](_src_contracts_.emittertransportcontract.md#offany)
* [on](_src_contracts_.emittertransportcontract.md#on)
* [onAny](_src_contracts_.emittertransportcontract.md#onany)
* [once](_src_contracts_.emittertransportcontract.md#once)

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

▸ **off**(event: *`string`*, handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

▸ **off**(event: *`string`*, handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

**Returns:** `void`

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

▸ **on**(event: *`string`*, handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

**Returns:** `void`

___
<a id="onany"></a>

###  onAny

▸ **onAny**(handler: *[AnyHandler](../modules/_src_contracts_.md#anyhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [AnyHandler](../modules/_src_contracts_.md#anyhandler) |

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

