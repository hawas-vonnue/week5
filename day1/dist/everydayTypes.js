//20 annotation of variables
let name = "batman";
let age = 10;
let flag = true;
let place = null;
let area;
let sym;
let bigInt;
let all;
let everything;
let possible;
let returning;
let obj;
let arr;
let tuple;
let arr2;
let fact;
let genres;
let objArray;
let namedArray;
let state;
namedArray = [["hello", 10]];
objArray = [{}];
//five functions with explicit parameters types and return types
function greet(name) {
    return `hello ${name}`;
}
function sum(num1, num2) {
    return num1 + num2;
}
function product(num1, num2) {
    return num1 * num2;
}
function concat(str1, str2) {
    return str1 + str2;
}
function check(flag) {
    return flag ? 10 : 20;
}
//to check inference
function checking(no) {
    return "hii";
}
let text = checking(10);
console.log(typeof text);
console.log(greet(name));
console.log(sum(age, age));
console.log(product(age, age));
console.log(concat(name, name));
console.log(check(false));
const greeting = "hello";
let greeting2 = "hello";
console.log(typeof greeting);
console.log(typeof greeting2);
function display(value) {
    if (typeof value === "string")
        console.log("name is ", value);
    else
        console.log("age is ", value);
}
display(20);
display(name);
export {};
