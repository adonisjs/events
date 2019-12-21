[@adonisjs/events](../README.md) › ["src/FakeEmitter/index"](../modules/_src_fakeemitter_index_.md) › [FakeEmitter](_src_fakeemitter_index_.fakeemitter.md)

# Class: FakeEmitter <**T**>

Fake emitter with memory transport to be used
during testing.

## Type parameters

▪ **T**: *any*

## Hierarchy

* [Emitter](_src_emitter_index_.emitter.md)‹T›

  ↳ **FakeEmitter**

## Implements

* EmitterContract‹T›

## Index

### Constructors

* [constructor](_src_fakeemitter_index_.fakeemitter.md#constructor)

### Properties

* [transport](_src_fakeemitter_index_.fakeemitter.md#transport)

### Accessors

* [events](_src_fakeemitter_index_.fakeemitter.md#events)

### Methods

* [clear](_src_fakeemitter_index_.fakeemitter.md#clear)
* [clearAllListeners](_src_fakeemitter_index_.fakeemitter.md#clearalllisteners)
* [clearListener](_src_fakeemitter_index_.fakeemitter.md#clearlistener)
* [clearListeners](_src_fakeemitter_index_.fakeemitter.md#clearlisteners)
* [emit](_src_fakeemitter_index_.fakeemitter.md#emit)
* [hasListeners](_src_fakeemitter_index_.fakeemitter.md#haslisteners)
* [listenerCount](_src_fakeemitter_index_.fakeemitter.md#listenercount)
* [namespace](_src_fakeemitter_index_.fakeemitter.md#namespace)
* [off](_src_fakeemitter_index_.fakeemitter.md#off)
* [offAny](_src_fakeemitter_index_.fakeemitter.md#offany)
* [on](_src_fakeemitter_index_.fakeemitter.md#on)
* [onAny](_src_fakeemitter_index_.fakeemitter.md#onany)
* [once](_src_fakeemitter_index_.fakeemitter.md#once)

## Constructors

###  constructor

\+ **new FakeEmitter**(`container`: IocContract): *[FakeEmitter](_src_fakeemitter_index_.fakeemitter.md)*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[constructor](_src_emitter_index_.emitter.md#constructor)*

**Parameters:**

Name | Type |
------ | ------ |
`container` | IocContract |

**Returns:** *[FakeEmitter](_src_fakeemitter_index_.fakeemitter.md)*

## Properties

###  transport

• **transport**: *[MemoryTransport](_src_transports_memory_.memorytransport.md)‹›* =  new MemoryTransport()

*Overrides [Emitter](_src_emitter_index_.emitter.md).[transport](_src_emitter_index_.emitter.md#transport)*

## Accessors

###  events

• **get events**(): *object[]*

Returns in memory events from transport

**Returns:** *object[]*

## Methods

###  clear

▸ **clear**(): *void*

Clear in memory events

**Returns:** *void*

___

###  clearAllListeners

▸ **clearAllListeners**(): *void*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[clearAllListeners](_src_emitter_index_.emitter.md#clearalllisteners)*

Clear all listeners for all events

**Returns:** *void*

___

###  clearListener

▸ **clearListener**<**K**>(`event`: K, `handler`: EventHandler | string): *void*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[clearListener](_src_emitter_index_.emitter.md#clearlistener)*

Remove existing event listener.

**`alias`** off

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | EventHandler &#124; string |

**Returns:** *void*

▸ **clearListener**<**K**>(`event`: K, `handler`: EventHandler | string): *void*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[clearListener](_src_emitter_index_.emitter.md#clearlistener)*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | EventHandler &#124; string |

**Returns:** *void*

___

###  clearListeners

▸ **clearListeners**<**K**>(`event`: K): *void*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[clearListeners](_src_emitter_index_.emitter.md#clearlisteners)*

Clear all listeners for a given event

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |

**Returns:** *void*

▸ **clearListeners**<**K**>(`event`: K): *void*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[clearListeners](_src_emitter_index_.emitter.md#clearlisteners)*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |

**Returns:** *void*

___

###  emit

▸ **emit**<**K**>(`event`: K, `data`: T[K]): *Promise‹void›*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[emit](_src_emitter_index_.emitter.md#emit)*

Emit event

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`data` | T[K] |

**Returns:** *Promise‹void›*

▸ **emit**<**K**>(`event`: K, `data`: T[K]): *Promise‹void›*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[emit](_src_emitter_index_.emitter.md#emit)*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`data` | T[K] |

**Returns:** *Promise‹void›*

___

###  hasListeners

▸ **hasListeners**<**K**>(`event?`: K): *boolean*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[hasListeners](_src_emitter_index_.emitter.md#haslisteners)*

Returns a boolean telling if listeners count for a given
event or all events is greater than 0 or not.

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | K |

**Returns:** *boolean*

▸ **hasListeners**<**K**>(`event?`: K): *boolean*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[hasListeners](_src_emitter_index_.emitter.md#haslisteners)*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | K |

**Returns:** *boolean*

___

###  listenerCount

▸ **listenerCount**<**K**>(`event?`: K): *number*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[listenerCount](_src_emitter_index_.emitter.md#listenercount)*

Returns count of listeners for a given event or all
events.

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | K |

**Returns:** *number*

▸ **listenerCount**<**K**>(`event?`: K): *number*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[listenerCount](_src_emitter_index_.emitter.md#listenercount)*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | K |

**Returns:** *number*

___

###  namespace

▸ **namespace**(`namespace`: string): *this*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[namespace](_src_emitter_index_.emitter.md#namespace)*

Define custom namespace for event listeners. It is set to `App/Listeners`
by default.

**Parameters:**

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** *this*

___

###  off

▸ **off**<**K**>(`event`: K, `handler`: EventHandler | string): *void*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[off](_src_emitter_index_.emitter.md#off)*

Remove existing event listener

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | EventHandler &#124; string |

**Returns:** *void*

▸ **off**<**K**>(`event`: K, `handler`: EventHandler | string): *void*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[off](_src_emitter_index_.emitter.md#off)*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | EventHandler &#124; string |

**Returns:** *void*

___

###  offAny

▸ **offAny**(`handler`: AnyHandler | string): *void*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[offAny](_src_emitter_index_.emitter.md#offany)*

Remove existing event listener for catch all handler

**Parameters:**

Name | Type |
------ | ------ |
`handler` | AnyHandler &#124; string |

**Returns:** *void*

___

###  on

▸ **on**<**K**>(`event`: K, `handler`: EventHandler‹T[K]› | string): *this*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[on](_src_emitter_index_.emitter.md#on)*

Define event handler for a given event

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | EventHandler‹T[K]› &#124; string |

**Returns:** *this*

▸ **on**<**K**>(`event`: K, `handler`: EventHandler‹T[K]› | string): *this*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[on](_src_emitter_index_.emitter.md#on)*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | EventHandler‹T[K]› &#124; string |

**Returns:** *this*

___

###  onAny

▸ **onAny**(`handler`: AnyHandler | string): *this*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[onAny](_src_emitter_index_.emitter.md#onany)*

Define catch all event handler to listen for all events.

**Parameters:**

Name | Type |
------ | ------ |
`handler` | AnyHandler &#124; string |

**Returns:** *this*

___

###  once

▸ **once**<**K**>(`event`: K, `handler`: EventHandler‹T[K]› | string): *this*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[once](_src_emitter_index_.emitter.md#once)*

Define event handler for a given event and to be called
only once.

**Type parameters:**

▪ **K**: *keyof T*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | EventHandler‹T[K]› &#124; string |

**Returns:** *this*

▸ **once**<**K**>(`event`: K, `handler`: EventHandler‹T[K]› | string): *this*

*Inherited from [Emitter](_src_emitter_index_.emitter.md).[once](_src_emitter_index_.emitter.md#once)*

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | EventHandler‹T[K]› &#124; string |

**Returns:** *this*
