[@adonisjs/events](../README.md) › ["src/Transports/Memory"](../modules/_src_transports_memory_.md) › [MemoryTransport](_src_transports_memory_.memorytransport.md)

# Class: MemoryTransport

Memory transparent adheres to the [[EmitterTransportContract]] to keep
emitted events with memory, that can be used later for tests assertions.

## Hierarchy

* **MemoryTransport**

## Implements

* EmitterTransportContract

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

• **events**: *object[]* = []

## Methods

###  _off

▸ **_off**(`_`: string, `__`: EventHandler): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_` | string |
`__` | EventHandler |

**Returns:** *void*

___

###  clearListeners

▸ **clearListeners**(`_`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_` | string |

**Returns:** *void*

___

###  emit

▸ **emit**(`event`: string, `data`: any): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`data` | any |

**Returns:** *Promise‹void›*

___

###  listenerCount

▸ **listenerCount**(`_`: string): *number*

**Parameters:**

Name | Type |
------ | ------ |
`_` | string |

**Returns:** *number*

___

###  off

▸ **off**(`_`: string, `__`: EventHandler): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_` | string |
`__` | EventHandler |

**Returns:** *void*

___

###  offAny

▸ **offAny**(`__`: AnyHandler): *void*

**Parameters:**

Name | Type |
------ | ------ |
`__` | AnyHandler |

**Returns:** *void*

___

###  on

▸ **on**(`_`: string, `__`: EventHandler): *void*

**Parameters:**

Name | Type |
------ | ------ |
`_` | string |
`__` | EventHandler |

**Returns:** *void*

___

###  onAny

▸ **onAny**(`__`: AnyHandler): *void*

**Parameters:**

Name | Type |
------ | ------ |
`__` | AnyHandler |

**Returns:** *void*

___

###  once

▸ **once**(`_`: string): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`_` | string |

**Returns:** *Promise‹void›*
