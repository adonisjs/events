> **[@poppinss/events](../README.md)**

[Globals](../README.md) / [@poppinss/events](_poppinss_events.md) /

# External module: @poppinss/events

## Index

### Interfaces

* [EmitterContract](../interfaces/_poppinss_events.emittercontract.md)
* [EmitterTransportContract](../interfaces/_poppinss_events.emittertransportcontract.md)

### Type aliases

* [AnyHandler](_poppinss_events.md#anyhandler)
* [EventHandler](_poppinss_events.md#eventhandler)

## Type aliases

###  AnyHandler

Ƭ **AnyHandler**: *function*

Shape of catch all events handler

#### Type declaration:

▸ (`event`: string, `data`: `T`): *`Promise<void>` | void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`data` | `T` |

___

###  EventHandler

Ƭ **EventHandler**: *function*

Shape of event handler

#### Type declaration:

▸ (`data`: `T`): *`Promise<void>` | void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | `T` |