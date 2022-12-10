import { makeEE, IEventEmitter } from './index';

// MockClass type is MockClass & EventEmitter
class MockClass implements IEventEmitter {
  declare $on: (eventName: string, callback: Function) => void;
  declare $emit: (eventName: string, data: any) => void;
  declare $off: (eventName: string, callback: Function) => void;

  constructor() {
    return Object.assign(this, makeEE());
  }

  public method() {
    return 'mock';
  }
}

it('should emit an event when the emitter is put inside the istance of a class', () => {
  const mock = new MockClass();
  const listener = jest.fn();
  mock.$on('event', listener);
  mock.$emit('event', {});
  expect(listener).toHaveBeenCalled();
});

it('should emit an event when the emitter is put inside an object', () => {
  const mock = Object.assign({}, makeEE());
  const listener = jest.fn();
  mock.$on('event', listener);
  mock.$emit('event', {});
  expect(listener).toHaveBeenCalled();
});

it('should emit an event once if $once is used', () => {
  const mock = Object.assign({}, makeEE());
  const listener = jest.fn();
  mock.$once('event', listener);
  mock.$emit('event', {});
  mock.$emit('event', {});
  expect(listener).toHaveBeenCalledTimes(1);
});

it('should not $emit if $off is used', () => {
  const mock = Object.assign({}, makeEE());
  const listener = jest.fn();
  mock.$on('event', listener);
  mock.$off('event', listener);
  mock.$emit('event', {});
  expect(listener).not.toHaveBeenCalled();
});
