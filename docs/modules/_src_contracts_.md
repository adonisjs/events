[@poppinss/events](../README.md) > ["src/contracts"](../modules/_src_contracts_.md)

# External module: "src/contracts"

## Index

### Interfaces

* [EmitterContract](../interfaces/_src_contracts_.emittercontract.md)
* [EmitterTransportContract](../interfaces/_src_contracts_.emittertransportcontract.md)
* [TypedEmitter](../interfaces/_src_contracts_.typedemitter.md)

### Type aliases

* [AnyHandler](_src_contracts_.md#anyhandler)
* [EventHandler](_src_contracts_.md#eventhandler)

---

## Type aliases

<a id="anyhandler"></a>

###  AnyHandler

**Ƭ AnyHandler**: *`function`*

Shape of catch all events handler

#### Type declaration
▸(event: *`string`*, data: *`T`*): `Promise`<`void`> \| `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| data | `T` |

**Returns:** `Promise`<`void`> \| `void`

___
<a id="eventhandler"></a>

###  EventHandler

**Ƭ EventHandler**: *`function`*

Shape of event handler

#### Type declaration
▸(data: *`T`*): `Promise`<`void`> \| `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `T` |

**Returns:** `Promise`<`void`> \| `void`

___

