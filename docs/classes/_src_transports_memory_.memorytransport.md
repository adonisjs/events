[@poppinss/events](../README.md) > ["src/Transports/Memory"](../modules/_src_transports_memory_.md) > [MemoryTransport](../classes/_src_transports_memory_.memorytransport.md)

# Class: MemoryTransport

Memory transparent adheres to the [EmitterTransportContract](../interfaces/_src_contracts_.emittertransportcontract.md) to keep emitted events with memory, that can be used later for tests assertions.

## Hierarchy

**MemoryTransport**

## Implements

* [EmitterTransportContract](../interfaces/_src_contracts_.emittertransportcontract.md)

## Index

### Properties

* [events](_src_transports_memory_.memorytransport.md#events)

### Methods

* [_off](_src_transports_memory_.memorytransport.md#_off)
* [clearListeners](_src_transports_memory_.memorytransport.md#clearlisteners)
* [emit](_src_transports_memory_.memorytransport.md#emit)
* [listenerCount](_src_transports_memory_.memorytransport.md#listenercount)
* [off](_src_transports_memory_.memorytransport.md#off)
* [offAny](_src_transports_memory_.memorytransport.md#offany)
* [on](_src_transports_memory_.memorytransport.md#on)
* [onAny](_src_transports_memory_.memorytransport.md#onany)
* [once](_src_transports_memory_.memorytransport.md#once)

---

## Properties

<a id="events"></a>

###  events

**● events**: *`object`[]* =  []

___

## Methods

<a id="_off"></a>

###  _off

▸ **_off**(_event: *`string`*, _handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _event | `string` |
| _handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

**Returns:** `void`

___
<a id="clearlisteners"></a>

###  clearListeners

▸ **clearListeners**(_event: *`string`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _event | `string` |

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

▸ **listenerCount**(_event: *`string`*): `number`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _event | `string` |

**Returns:** `number`

___
<a id="off"></a>

###  off

▸ **off**(_event: *`string`*, _handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _event | `string` |
| _handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

**Returns:** `void`

___
<a id="offany"></a>

###  offAny

▸ **offAny**(_handler: *[AnyHandler](../modules/_src_contracts_.md#anyhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _handler | [AnyHandler](../modules/_src_contracts_.md#anyhandler) |

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**(_event: *`string`*, _handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _event | `string` |
| _handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

**Returns:** `void`

___
<a id="onany"></a>

###  onAny

▸ **onAny**(_handler: *[AnyHandler](../modules/_src_contracts_.md#anyhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _handler | [AnyHandler](../modules/_src_contracts_.md#anyhandler) |

**Returns:** `void`

___
<a id="once"></a>

###  once

▸ **once**(_event: *`string`*): `Promise`<`void`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| _event | `string` |

**Returns:** `Promise`<`void`>

___

