"use strict";
const memoize = (func) => {
    const map = new Map();
    return function (...args) {
        let key = args.join(",");
        if (!map.has(key)) {
            console.log("adding to cache");
            let value = func.apply(null, args);
            console.log(args);
            // let value = func(args);
            map.set(key, value);
        }
        else
            console.log("fetching from cache");
        return map.get(key);
    };
};
//-----test---------
//fibonacci function
function fibonacci(n) {
    if (typeof n === "number") {
        if (n < 2)
            return n;
        let first = fibonacci(n - 1);
        let second = fibonacci(n - 2);
        if (first !== null && second !== null)
            return first + second;
    }
    return null;
}
const memoizeFibonacci = memoize(fibonacci);
console.time("firstCall");
console.log(memoizeFibonacci(20));
console.timeEnd("firstCall");
console.time("secondCall");
console.log(memoizeFibonacci(20));
console.timeEnd("secondCall");
