**[@poppinss/events](../README.md)**

[Globals](../README.md) › [@poppinss/events](../modules/_poppinss_events.md) › [EmitterTransportContract](_poppinss_events.emittertransportcontract.md)

# Interface: EmitterTransportContract

The shape of emitter transport. This has to be same as
`emittery`.

## Hierarchy

* **EmitterTransportContract**

## Implemented by

* [MemoryTransport](../classes/_src_transports_memory_.memorytransport.md)

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

## Methods

###  clearListeners

▸ **clearListeners**(`event?`: undefined | string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | undefined \| string |

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

▸ **listenerCount**(`event?`: undefined | string): *number*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | undefined \| string |

**Returns:** *number*

___

###  off

▸ **off**(`event`: string, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** *void*

▸ **off**(`event`: string, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** *void*

___

###  offAny

▸ **offAny**(`handler`: [AnyHandler](../modules/_poppinss_events.md#anyhandler)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`handler` | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** *void*

___

###  on

▸ **on**(`event`: string, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** *void*

___

###  onAny

▸ **onAny**(`handler`: [AnyHandler](../modules/_poppinss_events.md#anyhandler)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`handler` | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** *void*

___

###  once

▸ **once**(`event`: string): *Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |

**Returns:** *Promise‹any›*