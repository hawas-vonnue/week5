export declare class Queue<T> {
    queue: T[];
    constructor();
    enqueue(arg: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
}
