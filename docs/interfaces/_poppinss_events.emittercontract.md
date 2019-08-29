**[@poppinss/events](../README.md)**

[Globals](../README.md) › [@poppinss/events](../modules/_poppinss_events.md) › [EmitterContract](_poppinss_events.emittercontract.md)

# Interface: EmitterContract <**T**>

Shape of Event emitter

## Type parameters

▪ **T**: *any*

## Hierarchy

* **EmitterContract**

## Implemented by

* [Emitter](../classes/_src_emitter_index_.emitter.md)
* [FakeEmitter](../classes/_src_fakeemitter_index_.fakeemitter.md)

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

## Properties

###  transport

• **transport**: *[EmitterTransportContract](_poppinss_events.emittertransportcontract.md)*

## Methods

###  clearListener

▸ **clearListener**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler) | string): *void*

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) \| string |

**Returns:** *void*

▸ **clearListener**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler) | string): *void*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) \| string |

**Returns:** *void*

▸ **clearListener**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler) | string): *void*

**Type parameters:**

▪ **K**: *keyof T | string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) \| string |

**Returns:** *void*

___

###  clearListeners

▸ **clearListeners**<**K**>(`event`: K): *void*

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |

**Returns:** *void*

▸ **clearListeners**<**K**>(`event`: K): *void*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |

**Returns:** *void*

▸ **clearListeners**<**K**>(`event`: K): *void*

**Type parameters:**

▪ **K**: *keyof T | string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |

**Returns:** *void*

___

###  emit

▸ **emit**<**K**>(`event`: K, `data`: T[K]): *Promise‹void›*

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`data` | T[K] |

**Returns:** *Promise‹void›*

▸ **emit**<**K**>(`event`: K, `data`: T[K]): *Promise‹void›*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`data` | T[K] |

**Returns:** *Promise‹void›*

▸ **emit**<**K**>(`event`: K, `data`: T[K]): *Promise‹void›*

**Type parameters:**

▪ **K**: *keyof T | string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`data` | T[K] |

**Returns:** *Promise‹void›*

___

###  hasListeners

▸ **hasListeners**<**K**>(`event?`: [K]()): *boolean*

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | [K]() |

**Returns:** *boolean*

▸ **hasListeners**<**K**>(`event?`: [K]()): *boolean*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | [K]() |

**Returns:** *boolean*

▸ **hasListeners**<**K**>(`event?`: [K]()): *boolean*

**Type parameters:**

▪ **K**: *keyof T | string*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | [K]() |

**Returns:** *boolean*

___

###  listenerCount

▸ **listenerCount**<**K**>(`event?`: [K]()): *number*

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | [K]() |

**Returns:** *number*

▸ **listenerCount**<**K**>(`event?`: [K]()): *number*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | [K]() |

**Returns:** *number*

▸ **listenerCount**<**K**>(`event?`: [K]()): *number*

**Type parameters:**

▪ **K**: *keyof T | string*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | [K]() |

**Returns:** *number*

___

###  namespace

▸ **namespace**(`namespace`: string): *this*

**Parameters:**

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** *this*

___

###  off

▸ **off**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler) | string): *void*

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) \| string |

**Returns:** *void*

▸ **off**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler) | string): *void*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) \| string |

**Returns:** *void*

▸ **off**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler) | string): *void*

**Type parameters:**

▪ **K**: *keyof T | string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler) \| string |

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

▸ **on**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› | string): *this*

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› \| string |

**Returns:** *this*

▸ **on**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› | string): *this*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› \| string |

**Returns:** *this*

▸ **on**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› | string): *this*

**Type parameters:**

▪ **K**: *keyof T | string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› \| string |

**Returns:** *this*

___

###  onAny

▸ **onAny**(`handler`: [AnyHandler](../modules/_poppinss_events.md#anyhandler)): *this*

**Parameters:**

Name | Type |
------ | ------ |
`handler` | [AnyHandler](../modules/_poppinss_events.md#anyhandler) |

**Returns:** *this*

___

###  once

▸ **once**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› | string): *this*

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› \| string |

**Returns:** *this*

▸ **once**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› | string): *this*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› \| string |

**Returns:** *this*

▸ **once**<**K**>(`event`: K, `handler`: [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› | string): *this*

**Type parameters:**

▪ **K**: *keyof T | string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | [EventHandler](../modules/_poppinss_events.md#eventhandler)‹T[K]› \| string |

**Returns:** *this*