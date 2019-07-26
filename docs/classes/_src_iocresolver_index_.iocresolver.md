> **[@poppinss/events](../README.md)**

[Globals](../README.md) / ["src/IocResolver/index"](../modules/_src_iocresolver_index_.md) / [IocResolver](_src_iocresolver_index_.iocresolver.md) /

# Class: IocResolver

Resolves string based event listeners from the IoC container. Also this method wraps
the IoC container bindings in a closure. That closure is later used to remove
the event listeners properly.

## Hierarchy

* **IocResolver**

## Index

### Methods

* [getAnyHandler](_src_iocresolver_index_.iocresolver.md#getanyhandler)
* [getEventHandler](_src_iocresolver_index_.iocresolver.md#geteventhandler)
* [namespace](_src_iocresolver_index_.iocresolver.md#namespace)
* [removeAnyHandler](_src_iocresolver_index_.iocresolver.md#removeanyhandler)
* [removeEventHandler](_src_iocresolver_index_.iocresolver.md#removeeventhandler)

## Methods

###  getAnyHandler

▸ **getAnyHandler**(`handler`: string): *[AnyHandler](../modules/_poppinss_events.md#anyhandler)*

Returns Event handler for wildcard events. Adding the same
handler for multiple times is a noop.

**Parameters:**

Name | Type |
------ | ------ |
`handler` | string |

**Returns:** *[AnyHandler](../modules/_poppinss_events.md#anyhandler)*

___

###  getEventHandler

▸ **getEventHandler**(`event`: string, `handler`: string): *[EventHandler](../modules/_poppinss_events.md#eventhandler)*

Returns event handler callback for an IoC container string reference.
Adding same handler for the same event is noop.

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`handler` | string |

**Returns:** *[EventHandler](../modules/_poppinss_events.md#eventhandler)*

___

###  namespace

▸ **namespace**(`namespace`: string): *void*

Define custom namespace for Event listeners

**Parameters:**

Name | Type |
------ | ------ |
`namespace` | string |

**Returns:** *void*

___

###  removeAnyHandler

▸ **removeAnyHandler**(`handler`: string): *[AnyHandler](../modules/_poppinss_events.md#anyhandler) | null*

Removes and returns the handler for a string reference.

**Parameters:**

Name | Type |
------ | ------ |
`handler` | string |

**Returns:** *[AnyHandler](../modules/_poppinss_events.md#anyhandler) | null*

___

###  removeEventHandler

▸ **removeEventHandler**(`event`: string, `handler`: string): *[EventHandler](../modules/_poppinss_events.md#eventhandler) | null*

Removes the event handler from the tracked list and also returns
it back.

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`handler` | string |

**Returns:** *[EventHandler](../modules/_poppinss_events.md#eventhandler) | null*