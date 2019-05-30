[@poppinss/events](../README.md) > [@poppinss/events](../modules/_poppinss_events.md) > [IocResolver](../classes/_poppinss_events.iocresolver.md)

# Class: IocResolver

Resolves string based event listeners from the IoC container. Also this method wraps the IoC container bindings in a closure. That closure is later used to remove the event listeners properly.

## Hierarchy

**IocResolver**

## Index

### Methods

* [getAnyHandler](_poppinss_events.iocresolver.md#getanyhandler)
* [getEventHandler](_poppinss_events.iocresolver.md#geteventhandler)
* [namespace](_poppinss_events.iocresolver.md#namespace)
* [removeAnyHandler](_poppinss_events.iocresolver.md#removeanyhandler)
* [removeEventHandler](_poppinss_events.iocresolver.md#removeeventhandler)

---

## Methods

<a id="getanyhandler"></a>

###  getAnyHandler

▸ **getAnyHandler**(handler: *`string`*): [AnyHandler](../modules/_poppinss_events.md#anyhandler)

Returns Event handler for wildcard events. Adding the same handler for multiple times is a noop.

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | `string` |

**Returns:** [AnyHandler](../modules/_poppinss_events.md#anyhandler)

___
<a id="geteventhandler"></a>

###  getEventHandler

▸ **getEventHandler**(event: *`string`*, handler: *`string`*): [EventHandler](../modules/_poppinss_events.md#eventhandler)

Returns event handler callback for an IoC container string reference. Adding same handler for the same event is noop.

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | `string` |

**Returns:** [EventHandler](../modules/_poppinss_events.md#eventhandler)

___
<a id="namespace"></a>

###  namespace

▸ **namespace**(namespace: *`string`*): `void`

Define custom namespace for Event listeners

**Parameters:**

| Name | Type |
| ------ | ------ |
| namespace | `string` |

**Returns:** `void`

___
<a id="removeanyhandler"></a>

###  removeAnyHandler

▸ **removeAnyHandler**(handler: *`string`*): [AnyHandler](../modules/_poppinss_events.md#anyhandler) \| `null`

Removes and returns the handler for a string reference.

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | `string` |

**Returns:** [AnyHandler](../modules/_poppinss_events.md#anyhandler) \| `null`

___
<a id="removeeventhandler"></a>

###  removeEventHandler

▸ **removeEventHandler**(event: *`string`*, handler: *`string`*): [EventHandler](../modules/_poppinss_events.md#eventhandler) \| `null`

Removes the event handler from the tracked list and also returns it back.

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| handler | `string` |

**Returns:** [EventHandler](../modules/_poppinss_events.md#eventhandler) \| `null`

___

