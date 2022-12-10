# What is this?

This is a function which returns a simple EventEmitter.  
It is a simpler implementation of the EventEmitter class from NodeJS.  
It is not meant to be a replacement for the NodeJS EventEmitter, but rather a simple alternative for those who don't want to use the NodeJS EventEmitter.  
It is also a good way to learn how Event Emitting works as a concept.

# How do I install it?

You can install it by using the following command:

```bash
npm install @cadienvan/event-emitter
```

# How to use it?

Simply import the module and start using it as follows:

```js
import { makeEE } from '@cadienvan/event-emitter';
const myObject = Object.assign({}, makeEE());
function listener(data) {
  console.log(data);
}
myObject.$on('event', listener);
myObject.$emit('event', {});
```

## Why did I choose to call it makeEE?

I chose to call it makeEE because it is a function which returns an EventEmitter and I didn't want it to conflict with the NodeJS EventEmitter, allowing you to use both in the same project depending on the use case.

# How does this work?

The `makeEE` function returns an object with the following properties:

---

### $on

The `$on` function takes two arguments: the event name and the listener function.

```js
myObject.$on('event', listener);
```

---

### $off

The `$off` function takes two arguments: the event name and the listener function.

```js
myObject.$off('event', listener);
```

---

### $emit

The `$emit` function takes two arguments: the event name and the data to be passed to the listener function.

```js
myObject.$emit('event', data);
```

---

### $once

The `$once` function takes two arguments: the event name and the listener function.

```js
myObject.$once('event', listener);
```

# Tests

You can run the tests by using the following command:

```bash
npm test
```

# Scaffolding

This project was generated using Cadienvan's own [npm-package-ts-scaffolding](https://github.com/Cadienvan/npm-package-ts-scaffolding) so it has all the necessary tools to develop, test and publish a TypeScript package importable both via CommonJS and ES Modules.
