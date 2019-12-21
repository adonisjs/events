[@adonisjs/events](../README.md) › ["src/Emitter/index"](../modules/_src_emitter_index_.md) › [Emitter](_src_emitter_index_.emitter.md)

# Class: Emitter <**T**>

Emitter class exposes the API for async event emitter built on top of
Emittery. It also exposes an API to pre-define the Typescript types
for different events.

## Type parameters

▪ **T**: *any*

## Hierarchy

* **Emitter**

  ↳ [FakeEmitter](_src_fakeemitter_index_.fakeemitter.md)

## Implements

* EmitterContract‹T›

## Index

### Constructors

* [constructor](_src_emitter_index_.emitter.md#constructor)

### Properties

* [transport](_src_emitter_index_.emitter.md#transport)

### Methods

* [clearAllListeners](_src_emitter_index_.emitter.md#clearalllisteners)
* [clearListener](_src_emitter_index_.emitter.md#clearlistener)
* [clearListeners](_src_emitter_index_.emitter.md#clearlisteners)
* [emit](_src_emitter_index_.emitter.md#emit)
* [hasListeners](_src_emitter_index_.emitter.md#haslisteners)
* [listenerCount](_src_emitter_index_.emitter.md#listenercount)
* [namespace](_src_emitter_index_.emitter.md#namespace)
* [off](_src_emitter_index_.emitter.md#off)
* [offAny](_src_emitter_index_.emitter.md#offany)
* [on](_src_emitter_index_.emitter.md#on)
* [onAny](_src_emitter_index_.emitter.md#onany)
* [once](_src_emitter_index_.emitter.md#once)

## Constructors

###  constructor

\+ **new Emitter**(`container`: IocContract): *[Emitter](_src_emitter_index_.emitter.md)*

**Parameters:**

Name | Type |
------ | ------ |
`container` | IocContract |

**Returns:** *[Emitter](_src_emitter_index_.emitter.md)*

## Properties

###  transport

• **transport**: *EmitterTransportContract* =  new Emittery()

## Methods

###  clearAllListeners

▸ **clearAllListeners**(): *void*

Clear all listeners for all events

**Returns:** *void*

___

###  clearListener

▸ **clearListener**<**K**>(`event`: K, `handler`: EventHandler | string): *void*

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

Clear all listeners for a given event

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

___

###  emit

▸ **emit**<**K**>(`event`: K, `data`: T[K]): *Promise‹void›*

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

Remove existing event listener for catch all handler

**Parameters:**

Name | Type |
------ | ------ |
`handler` | AnyHandler &#124; string |

**Returns:** *void*

___

###  on

▸ **on**<**K**>(`event`: K, `handler`: EventHandler‹T[K]› | string): *this*

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

Define catch all event handler to listen for all events.

**Parameters:**

Name | Type |
------ | ------ |
`handler` | AnyHandler &#124; string |

**Returns:** *this*

___

###  once

▸ **once**<**K**>(`event`: K, `handler`: EventHandler‹T[K]› | string): *this*

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

**Type parameters:**

▪ **K**: *string*

**Parameters:**

Name | Type |
------ | ------ |
`event` | K |
`handler` | EventHandler‹T[K]› &#124; string |

**Returns:** *this*
