export class Queue {
    queue;
    constructor() {
        this.queue = [];
    }
    enqueue(arg) {
        this.queue.push(arg);
    }
    dequeue() {
        return this.queue.shift();
    }
    peek() {
        return this.queue[0];
    }
    isEmpty() {
        return this.queue.length === 0;
    }
}
