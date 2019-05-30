[@poppinss/events](../README.md) > ["src/contracts"](../modules/_src_contracts_.md) > [TypedEmitter](../interfaces/_src_contracts_.typedemitter.md)

# Interface: TypedEmitter

Typed emitter ensure that the emitted and consumed data adheres to a type

## Type parameters
#### Data :  `any`
## Hierarchy

**TypedEmitter**

## Index

### Properties

* [eventName](_src_contracts_.typedemitter.md#eventname)

### Methods

* [emit](_src_contracts_.typedemitter.md#emit)
* [on](_src_contracts_.typedemitter.md#on)
* [once](_src_contracts_.typedemitter.md#once)

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

▸ **on**(handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

**Returns:** `void`

___
<a id="once"></a>

###  once

▸ **once**(handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [EventHandler](../modules/_src_contracts_.md#eventhandler) |

**Returns:** `void`

___

