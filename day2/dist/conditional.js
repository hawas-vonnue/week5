//-------------------------------------------------Test-------------------------
let arr = [];
let isArray;
//type of isArray is true
function fn(arg) {
    return arg;
}
//the type of return type can be seen by hovering mouse over it. it is number now
let returnType;
function fn1(arg, arg2, arg3) {
    return "hello";
}
let args;
function fn2(...args) {
    console.log(args);
}
fn2("hello", 10, { id: 11, name: "lord mountbatten" });
export {};
