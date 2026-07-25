function identity<T>(arg: T): T {
    return arg;
}

function first<T>(arr: T[]): T | undefined {
    return arr[0];
}

async function fetchData<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url);
        let data: T = await response.json();

        return data;
    } catch (error) {
        return Promise.reject(error);
    }
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

class Queue<T> {
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
//----------------Test---------------------
interface user {
    name: string;
    id: number;
}
let obj: user = {
    name: "Kafka",
    id: 10,
};
console.log("------------------Testing identity----------------------------");
console.log(identity(10));
console.log(identity("hello world"));
console.log(identity(obj));

let arr = [1, 2, 3];
let arr1: string[] = [];
console.log("-------------------Testing first------------------------------");
console.log(first(arr));
console.log(first(arr1));

let url = "https://jsonplaceholder.typicode.com/posts/1";
fetchData(url).then((response) => {
    console.log(
        "-----------------------Testing fetchData----------------------"
    );
    console.log(typeof response);
    console.log(response);
});

console.log("-----------------Testing getProperty---------------------------");
console.log(getProperty(obj, "name"));

console.log("-----------------Testing QUeue---------------------------------");
let q = new Queue<string>();
q.enqueue("hello");
console.log(q.peek());
q.enqueue("hey");
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.isEmpty());
