[@poppinss/events](../README.md) > ["src/Emitter/TypedEmitter"](../modules/_src_emitter_typedemitter_.md) > [TypedEmitter](../classes/_src_emitter_typedemitter_.typedemitter.md)

# Class: TypedEmitter

TypedEmitter implements a subset of [Emitter](_src_emitter_index_.emitter.md) methods to emit events only when the data satisfies pre-defined Typescript types.

## Type parameters
#### Data :  `any`
## Hierarchy

**TypedEmitter**

## Index

### Constructors

* [constructor](_src_emitter_typedemitter_.typedemitter.md#constructor)

### Properties

* [$transport](_src_emitter_typedemitter_.typedemitter.md#_transport)
* [eventName](_src_emitter_typedemitter_.typedemitter.md#eventname)

### Methods

* [emit](_src_emitter_typedemitter_.typedemitter.md#emit)
* [on](_src_emitter_typedemitter_.typedemitter.md#on)
* [once](_src_emitter_typedemitter_.typedemitter.md#once)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TypedEmitter**(eventName: *`string`*, $transport: *[EmitterTransportContract](../interfaces/_src_contracts_.emittertransportcontract.md)*): [TypedEmitter](_src_emitter_typedemitter_.typedemitter.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | `string` |
| $transport | [EmitterTransportContract](../interfaces/_src_contracts_.emittertransportcontract.md) |

**Returns:** [TypedEmitter](_src_emitter_typedemitter_.typedemitter.md)

___

## Properties

<a id="_transport"></a>

### `<Protected>` $transport

**● $transport**: *[EmitterTransportContract](../interfaces/_src_contracts_.emittertransportcontract.md)*

___
<a id="eventname"></a>

###  eventName

**● eventName**: *`string`*

___

## Methods

<a id="emit"></a>

###  emit

▸ **emit**(data: *`Data`*): `Promise`<`void`>

Emit data

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Data` |

**Returns:** `Promise`<`void`>

___
<a id="on"></a>

###  on

▸ **on**(handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)<`Data`>*): `void`

Define event handler for the given event

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [EventHandler](../modules/_src_contracts_.md#eventhandler)<`Data`> |

**Returns:** `void`

___
<a id="once"></a>

###  once

▸ **once**(handler: *[EventHandler](../modules/_src_contracts_.md#eventhandler)<`Data`>*): `void`

Define event handler for the given event only once.

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [EventHandler](../modules/_src_contracts_.md#eventhandler)<`Data`> |

**Returns:** `void`

___

