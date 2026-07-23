//use this to solve the issue of redeclaration error because variables are declared in lib dom
export {};

//20 annotation of variables
let name: string = "batman";
let age: number = 10;
let flag: boolean = true;
let place: null = null;
let area: undefined;
let sym: symbol;
let bigInt: bigint;
let all: any;
let everything: unknown;
let possible: never;
let returning: void;
let obj: object;
let arr: Array<string>;
let tuple: [number, string];
let arr2: string[];
let fact: string | boolean;
let genres: string | string[];
let objArray: object[];
let namedArray: [string, number][];
let state: "success" | "error";

namedArray = [["hello", 10]];
objArray = [{}];

//five functions with explicit parameters types and return types
function greet(name: string): string {
    return `hello ${name}`;
}

function sum(num1: number, num2: number): number {
    return num1 + num2;
}

function product(num1: number, num2: number): number {
    return num1 * num2;
}

function concat(str1: string, str2: string): string {
    return str1 + str2;
}

function check(flag: boolean): number {
    return flag ? 10 : 20;
}

//to check inference
function checking(no: number) {
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

function display(value: string | number) {
    if (typeof value === "string") console.log("name is ", value);
    else console.log("age is ", value);
}
display(20);
display(name);
