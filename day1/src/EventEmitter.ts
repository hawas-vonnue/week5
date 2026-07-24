type func = (...x: unknown[]) => void;
class EventEmitter {
    eventMap: Map<string, func[]>;
    constructor() {
        this.eventMap = new Map();
    }

    on(event: string, listener: func) {
        if (!this.eventMap.has(event)) {
            this.eventMap.set(event, []);
        }
        this.eventMap?.get(event)?.push(listener);
    }

    off(event: string, listener: func) {
        if (this.eventMap.has(event)) {
            const listerners = this.eventMap
                ?.get(event)
                ?.filter((fn: func) => fn != listener);
            if (listerners !== undefined) this.eventMap.set(event, listerners);
        }
    }

    emit(event: string, ...args: unknown[]) {
        if (this.eventMap.has(event)) {
            this.eventMap?.get(event)?.forEach((listener: func) => {
                listener(...args);
            });
            if (this.eventMap.has("*")) {
                let wildcardListeners = this.eventMap.get("*");
                wildcardListeners?.forEach((wildcardListener: func) => {
                    wildcardListener(...args);
                });
            }
        }
    }

    once(event: string, listener: func) {
        const wrapper = (...args: unknown[]) => {
            this.off(event, wrapper);
            listener(...args);
        };
        this.on(event, wrapper);
    }
}

//---------test-------

function fn1(str: unknown) {
    if (typeof str === "string") console.log("hello ", str);
}

function fn2(num: unknown) {
    if (typeof num === "number") console.log("number ", num);
}
const eventEmitter = new EventEmitter();
eventEmitter.on("hello", fn1);
eventEmitter.on("number", fn2);
eventEmitter.on("*", fn1);
// eventEmitter.emit("hello", "world");
eventEmitter.emit("number", 101);
