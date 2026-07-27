export {};
type isArray<T> = T extends any[] ? true : false;
type Flatten<T> = T extends Array<infer Item> ? Item : T;
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;
type ReturnType<T> = T extends (...args: any[]) => infer U ? U : any;
type Parameters<T> = T extends (...args: infer U) => any ? U : any;

//-------------------------------------------------Testing----------------------

let arr: string[] = [];
let isArray: isArray<typeof arr>;
//type of isArray is true

let arr2 = [[["hello"]]];
let flattened: Flatten<typeof arr2>;

function fn(arg: number) {
    return arg;
}
//the type of return type can be seen by hovering mouse over it. it is number now
let returnType: ReturnType<typeof fn>;

function fn1(arg: string, arg2: number, arg3: { id: number; name: string }) {
    return "hello";
}
let args: Parameters<typeof fn1>;
function fn2(...args: Parameters<typeof fn1>) {
    console.log(args);
}
fn2("hello", 10, { id: 11, name: "lord mountbatten" });
