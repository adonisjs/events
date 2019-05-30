[@poppinss/events](../README.md) > [@poppinss/events](../modules/_poppinss_events.md)

# External module: @poppinss/events

## Index

### Classes

* [Emitter](../classes/_poppinss_events.emitter.md)
* [FakeEmitter](../classes/_poppinss_events.fakeemitter.md)
* [IocResolver](../classes/_poppinss_events.iocresolver.md)
* [MemoryTransport](../classes/_poppinss_events.memorytransport.md)
* [TypedEmitter](../classes/_poppinss_events.typedemitter.md)

### Interfaces

* [EmitterContract](../interfaces/_poppinss_events.emittercontract.md)
* [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)
* [TypedEmitterContract](../interfaces/_poppinss_events.typedemittercontract.md)

### Type aliases

* [AnyHandler](_poppinss_events.md#anyhandler)
* [EventHandler](_poppinss_events.md#eventhandler)

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

