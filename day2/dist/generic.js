"use strict";
function identity(arg) {
    return arg;
}
function first(arr) {
    return arr[0];
}
async function fetchData(url) {
    try {
        const response = await fetch(url);
        let data = await response.json();
        return data;
    }
    catch (error) {
        return Promise.reject(error);
    }
}
function getProperty(obj, key) {
    return obj[key];
}
class Queue {
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
let obj = {
    name: "Kafka",
    id: 10,
};
console.log("------------------Testing identity----------------------------");
console.log(identity(10));
console.log(identity("hello world"));
console.log(identity(obj));
let arr = [1, 2, 3];
let arr1 = [];
console.log("-------------------Testing first------------------------------");
console.log(first(arr));
console.log(first(arr1));
let url = "https://jsonplaceholder.typicode.com/posts/1";
fetchData(url).then((response) => {
    console.log("-----------------------Testing fetchData----------------------");
    console.log(typeof response);
    console.log(response);
});
console.log("-----------------Testing getProperty---------------------------");
console.log(getProperty(obj, "name"));
console.log("-----------------Testing QUeue---------------------------------");
let q = new Queue();
q.enqueue("hello");
console.log(q.peek());
q.enqueue("hey");
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.isEmpty());
