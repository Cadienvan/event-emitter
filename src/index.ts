export interface IEventEmitter {
  $on: (eventName: string, callback: (data: unknown) => void) => void;
  $emit: (eventName: string, data: unknown) => void;
  $off: (eventName: string, callback: (data: unknown) => void) => void;
  $once: (eventName: string, callback: (data: unknown) => void) => void;
}

export class EventEmitter {
  private $listeners: Record<string, Function[]>;

  constructor() {
    this.$listeners = {};
  }

  $on(eventName: string, callback: (data: unknown) => void): void {
    if (!this.$listeners[eventName]) {
      this.$listeners[eventName] = [];
    }
    this.$listeners[eventName].push(callback);
  }

  $emit(eventName: string, data?: unknown) {
    if (this.$listeners[eventName]) {
      this.$listeners[eventName].forEach(function (callback) {
        callback(data || {});
      });
    }
  }

  $off(eventName: string, callback: (data: unknown) => void): void {
    if (this.$listeners[eventName]) {
      this.$listeners[eventName].splice(
        this.$listeners[eventName].indexOf(callback),
        1
      );
    }
  }

  $once(eventName: string, callback: (data: unknown) => void): void {
    const onceCallback = (data: unknown) => {
      callback(data);
      this.$off(eventName, onceCallback);
    };
    this.$on(eventName, onceCallback);
  }
}

export function makeEE() {
  const ee = new EventEmitter();
  ee.$on = EventEmitter.prototype.$on;
  ee.$emit = EventEmitter.prototype.$emit;
  ee.$off = EventEmitter.prototype.$off;
  ee.$once = EventEmitter.prototype.$once;
  // Return ee with all the methods of EventEmitter
  return ee;
}
