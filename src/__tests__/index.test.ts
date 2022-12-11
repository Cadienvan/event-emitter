import { makeEE, IEventEmitter, EventEmitter } from '../index';

class MockClassWithExtend extends EventEmitter {
  public method() {
    return 'mock';
  }
}

describe('testing direct instantiation', () => {
  it('should emit an event when the emitter is put inside an object', () => {
    const mock = new EventEmitter();
    const listener = jest.fn();
    mock.$on('event', listener);
    mock.$emit('event', {});
    expect(listener).toHaveBeenCalled();
  });

  it('should emit an event once if $once is used', () => {
    const mock = new EventEmitter();
    const listener = jest.fn();
    mock.$once('event', listener);
    mock.$emit('event', {});
    mock.$emit('event', {});
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should not $emit if $off is used', () => {
    const mock = new EventEmitter();
    const listener = jest.fn();
    mock.$on('event', listener);
    mock.$off('event', listener);
    mock.$emit('event', {});
    expect(listener).not.toHaveBeenCalled();
  });
});

describe('testing assignment to Object', () => {
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
});

describe('testing inheritance', () => {
  it('should emit an event when the emitter is put inside the istance of a class', () => {
    const mock = new MockClassWithExtend();
    const listener = jest.fn();
    mock.$on('event', listener);
    mock.$emit('event', {});
    expect(listener).toHaveBeenCalled();
  });
});
