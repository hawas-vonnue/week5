"use strict";
class EventEmitter {
    eventMap;
    constructor() {
        this.eventMap = new Map();
    }
    on(event, listener) {
        if (!this.eventMap.has(event)) {
            this.eventMap.set(event, []);
        }
        this.eventMap?.get(event)?.push(listener);
    }
    off(event, listener) {
        if (this.eventMap.has(event)) {
            const listerners = this.eventMap
                ?.get(event)
                ?.filter((fn) => fn != listener);
            if (listerners !== undefined)
                this.eventMap.set(event, listerners);
        }
    }
    emit(event, ...args) {
        if (this.eventMap.has(event)) {
            this.eventMap?.get(event)?.forEach((listener) => {
                listener(...args);
            });
            if (this.eventMap.has("*")) {
                let wildcardListeners = this.eventMap.get("*");
                wildcardListeners?.forEach((wildcardListener) => {
                    wildcardListener(...args);
                });
            }
        }
    }
    once(event, listener) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            listener(...args);
        };
        this.on(event, wrapper);
    }
}
//---------test-------
function fn1(str) {
    if (typeof str === "string")
        console.log("hello ", str);
}
function fn2(num) {
    if (typeof num === "number")
        console.log("number ", num);
}
const eventEmitter = new EventEmitter();
eventEmitter.on("hello", fn1);
eventEmitter.on("number", fn2);
eventEmitter.on("*", fn1);
// eventEmitter.emit("hello", "world");
eventEmitter.emit("number", 101);
