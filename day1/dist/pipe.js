"use strict";
//this only works for one type of parameters
// function pipe<type>(...fns: ((arg: type) => type)[]): (x: type) => type {
//     // if (fns.length === 0) return null;
//     return function (x: type) {
//         let value = x;
//         fns.forEach((func) => {
//             value = func(value);
//         });
//         return value;
//     };
// }
function pipe(...fns) {
    return function (x) {
        let value = x;
        fns.forEach((func) => {
            value = func(value);
        });
        return value;
    };
}
//-----Test---------//
function lengthOfString(str) {
    if (typeof str === "string")
        return str.length;
}
function double(num) {
    if (typeof num === "number")
        return num * 2;
}
console.log(pipe(lengthOfString, double)("hello"));
console.log(pipe(double, double)(5));
