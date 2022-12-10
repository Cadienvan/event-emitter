export function makeEE() {
  const $listeners = {};
  return {
    $on(eventName: string, callback: Function) {
      if (!$listeners[eventName]) {
        $listeners[eventName] = [];
      }
      $listeners[eventName].push(callback);
    },

    $emit(eventName: string, data?: any) {
      if ($listeners[eventName]) {
        $listeners[eventName].forEach(function (callback) {
          callback(data || {});
        });
      }
    },

    $off(eventName: string, callback: Function) {
      if ($listeners[eventName]) {
        $listeners[eventName].splice(
          $listeners[eventName].indexOf(callback),
          1
        );
      }
    },

    $once(eventName: string, callback: Function) {
      const self = this;
      const onceCallback = function (data: any) {
        callback(data);
        self.$off(eventName, onceCallback);
      };
      this.$on(eventName, onceCallback);
    }
  } as IEventEmitter;
}

export interface IEventEmitter {
  $on: (eventName: string, callback: Function) => void;
  $emit: (eventName: string, data: any) => void;
  $off: (eventName: string, callback: Function) => void;
}
