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
function pipe(...fns: ((arg: unknown) => unknown)[]): (x: unknown) => unknown {
    return function (x: unknown) {
        let value = x;
        fns.forEach((func) => {
            value = func(value);
        });
        return value;
    };
}

//-----Test---------//

function lengthOfString(str: unknown): number | undefined {
    if (typeof str === "string") return str.length;
}
function double(num: unknown): number | undefined {
    if (typeof num === "number") return num * 2;
}
console.log(pipe(lengthOfString, double)("hello"));
console.log(pipe(double, double)(5));
