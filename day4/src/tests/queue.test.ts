import { Queue } from "@utils/queue";

describe("Testing queue with string", () => {
    let queue = new Queue<string>();

    test("stores data", () => {
        queue.enqueue("hello");
        expect(queue.queue).toContain("hello");
    });

    test("retrieves works", () => {
        expect(queue.dequeue()).toBe("hello");
    });

    test("is empty works", () => {
        expect(queue.isEmpty()).toBeTruthy;
    });
});

describe("Testing queue with number", () => {
    let queue = new Queue<number>();
    let number = 10;

    test("stores data", () => {
        queue.enqueue(number);
        expect(queue.queue).toContain(number);
    });

    test("retrieves data works", () => {
        expect(queue.dequeue()).toBe(number);
    });

    test("is empty works", () => {
        expect(queue.isEmpty()).toBeTruthy;
    });
});

describe("Testing queue with object", () => {
    let queue = new Queue<object>();
    let obj: object = {
        id: 101,
        name: "damodharan unni magan dharman edamkochi",
    };

    test("stores data", () => {
        queue.enqueue(obj);
        expect(queue.queue).toContain(obj);
    });

    test("retrieves data", () => {
        expect(queue.dequeue()).toBe(obj);
    });

    test("is empty works", () => {
        expect(queue.isEmpty()).toBeTruthy;
    });
});
