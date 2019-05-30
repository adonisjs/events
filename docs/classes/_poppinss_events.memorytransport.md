[@poppinss/events](../README.md) > [@poppinss/events](../modules/_poppinss_events.md) > [MemoryTransport](../classes/_poppinss_events.memorytransport.md)

# Class: MemoryTransport

Memory transparent adheres to the [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md) to keep emitted events with memory, that can be used later for tests assertions.

## Hierarchy

**MemoryTransport**

## Implements

* [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)

## Index

### Properties

* [events](_poppinss_events.memorytransport.md#events)

### Methods

* [_off](_poppinss_events.memorytransport.md#_off)
* [clearListeners](_poppinss_events.memorytransport.md#clearlisteners)
* [emit](_poppinss_events.memorytransport.md#emit)
* [listenerCount](_poppinss_events.memorytransport.md#listenercount)
* [off](_poppinss_events.memorytransport.md#off)
* [offAny](_poppinss_events.memorytransport.md#offany)
* [on](_poppinss_events.memorytransport.md#on)
* [onAny](_poppinss_events.memorytransport.md#onany)
* [once](_poppinss_events.memorytransport.md#once)

---

## Properties

<a id="events"></a>

###  events

**● events**: *`object`[]* =  []

___

## Methods

<a id="_off"></a>

###  _off

▸ **_off**(_event: *`string`*, _handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _event | `string` |
| _handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

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

▸ **off**(_event: *`string`*, _handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _event | `string` |
| _handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** `void`

___
<a id="offany"></a>

###  offAny

▸ **offAny**(_handler: *[AnyHandler](../modules/_poppinss_events.md#anyhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _handler | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** `void`

___
<a id="on"></a>

###  on

▸ **on**(_event: *`string`*, _handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _event | `string` |
| _handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** `void`

___
<a id="onany"></a>

###  onAny

▸ **onAny**(_handler: *[AnyHandler](../modules/_poppinss_events.md#anyhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| _handler | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

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

