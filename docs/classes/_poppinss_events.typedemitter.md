[@poppinss/events](../README.md) > [@poppinss/events](../modules/_poppinss_events.md) > [TypedEmitter](../classes/_poppinss_events.typedemitter.md)

# Class: TypedEmitter

TypedEmitter implements a subset of [Emitter](_poppinss_events.emitter.md) methods to emit events only when the data satisfies pre-defined Typescript types.

## Type parameters
#### Data :  `any`
## Hierarchy

**TypedEmitter**

## Implements

* [TypedEmitterContract](../interfaces/_poppinss_events.typedemittercontract.md)<`Data`>

## Index

### Constructors

* [constructor](_poppinss_events.typedemitter.md#constructor)

### Properties

* [$transport](_poppinss_events.typedemitter.md#_transport)
* [eventName](_poppinss_events.typedemitter.md#eventname)

### Methods

* [emit](_poppinss_events.typedemitter.md#emit)
* [on](_poppinss_events.typedemitter.md#on)
* [once](_poppinss_events.typedemitter.md#once)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TypedEmitter**(eventName: *`string`*, $transport: *[EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)*): [TypedEmitter](_poppinss_events.typedemitter.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| eventName | `string` |
| $transport | [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md) |

**Returns:** [TypedEmitter](_poppinss_events.typedemitter.md)

___

## Properties

<a id="_transport"></a>

### `<Protected>` $transport

**● $transport**: *[EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)*

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

▸ **on**(handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`Data`>*): `void`

Define event handler for the given event

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler)<`Data`> |

**Returns:** `void`

___
<a id="once"></a>

###  once

▸ **once**(handler: *[EventHandler](../modules/_poppinss_events.md#eventhandler)<`Data`>*): `void`

Define event handler for the given event only once.

**Parameters:**

| Name | Type |
| ------ | ------ |
| handler | [EventHandler](../modules/_poppinss_events.md#eventhandler)<`Data`> |

**Returns:** `void`

___

