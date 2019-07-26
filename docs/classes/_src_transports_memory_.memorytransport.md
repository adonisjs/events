> **[@poppinss/events](../README.md)**

[Globals](../README.md) / ["src/Transports/Memory"](../modules/_src_transports_memory_.md) / [MemoryTransport](_src_transports_memory_.memorytransport.md) /

# Class: MemoryTransport

Memory transparent adheres to the [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md) to keep
emitted events with memory, that can be used later for tests assertions.

## Hierarchy

* **MemoryTransport**

## Implements

* [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)

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

## Properties

###  events

• **events**: *object[]* =  []

## Methods

###  _off

▸ **_off**(`_event`: string, `_handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_event` | string |
`_handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** *void*

___

###  clearListeners

▸ **clearListeners**(`_event`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_event` | string |

**Returns:** *void*

___

###  emit

▸ **emit**(`event`: string, `data`: any): *`Promise<void>`*

*Implementation of [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`data` | any |

**Returns:** *`Promise<void>`*

___

###  listenerCount

▸ **listenerCount**(`_event`: string): *number*

**Parameters:**

Name | Type |
------ | ------ |
`_event` | string |

**Returns:** *number*

___

###  off

▸ **off**(`_event`: string, `_handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)): *void*

*Implementation of [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_event` | string |
`_handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** *void*

___

###  offAny

▸ **offAny**(`_handler`: [AnyHandler](../modules/_poppinss_events.md#anyhandler)): *void*

*Implementation of [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_handler` | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** *void*

___

###  on

▸ **on**(`_event`: string, `_handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)): *void*

*Implementation of [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_event` | string |
`_handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** *void*

___

###  onAny

▸ **onAny**(`_handler`: [AnyHandler](../modules/_poppinss_events.md#anyhandler)): *void*

*Implementation of [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_handler` | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** *void*

___

###  once

▸ **once**(`_event`: string): *`Promise<void>`*

*Implementation of [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_event` | string |

**Returns:** *`Promise<void>`*