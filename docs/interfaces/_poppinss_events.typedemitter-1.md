[@poppinss/events](../README.md) > [@poppinss/events](../modules/_poppinss_events.md) > [TypedEmitter](../interfaces/_poppinss_events.typedemitter-1.md)

# Interface: TypedEmitter

Typed emitter ensure that the emitted and consumed data adheres to a type

## Type parameters
#### Data :  `any`
## Hierarchy

**TypedEmitter**

## Index

### Properties

* [eventName](_poppinss_events.typedemitter-1.md#eventname)

### Methods

* [emit](_poppinss_events.typedemitter-1.md#emit)
* [on](_poppinss_events.typedemitter-1.md#on)
* [once](_poppinss_events.typedemitter-1.md#once)

---

## Properties

<a id="eventname"></a>

###  eventName

**● eventName**: *`string`*

___

## Methods

<a id="emit"></a>

###  emit

▸ **emit**(data: *`Data`*): `Promise`<`void`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Data` |

**Returns:** `Promise`<`void`>

___
<a id="on"></a>

###  on

▸ **on**(handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** `void`

___
<a id="once"></a>

###  once

▸ **once**(handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler) |

**Returns:** `void`

___

