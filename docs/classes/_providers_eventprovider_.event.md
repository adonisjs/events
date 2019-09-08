**[@adonisjs/events](../README.md)**

[Globals](../README.md) › ["providers/EventProvider"](../modules/_providers_eventprovider_.md) › [Event](_providers_eventprovider_.event.md)

# Class: Event

## Hierarchy

* **Event**

## Index

### Constructors

* [constructor](_providers_eventprovider_.event.md#constructor)

### Properties

* [$container](_providers_eventprovider_.event.md#protected-$container)

### Methods

* [register](_providers_eventprovider_.event.md#register)

## Constructors

###  constructor

\+ **new Event**(`$container`: IocContract): *[Event](_providers_eventprovider_.event.md)*

**Parameters:**

Name | Type |
------ | ------ |
`$container` | IocContract |

**Returns:** *[Event](_providers_eventprovider_.event.md)*

## Properties

### `Protected` $container

• **$container**: *IocContract*

## Methods

###  register

▸ **register**(): *void*

Register `Event emitter` to the container.

**Returns:** *void*