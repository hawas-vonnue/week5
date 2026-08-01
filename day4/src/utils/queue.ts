export class Queue<T> {
    queue: T[];
    constructor() {
        this.queue = [];
    }
    enqueue(arg: T): void {
        this.queue.push(arg);
    }
    dequeue(): T | undefined {
        return this.queue.shift();
    }
    peek(): T | undefined {
        return this.queue[0];
    }
    isEmpty(): boolean {
        return this.queue.length === 0;
    }
}
