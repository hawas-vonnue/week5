type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

type MyPartial<T> = { [Property in keyof T]+?: T[Property] };

type MyDeepPartial<T> = T extends object
    ? { [Property in keyof T]+?: MyDeepPartial<T[Property]> }
    : T;

function propertyAccessor<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let object1 = {
    id: "hello",
    name: "william shakesphere",
    hobby: "writing",
};
type keyType = keyof typeof object1;

//because task asked to use combination of keyof and typeof for generic getaccessor keyof is the only thing needed.
function getPropertiesOfSpecificObject(key: keyType) {
    return object1[key];
}
//--------------------------Testing----------------------------------

interface obj {
    id: number;
    name: string;
}

let test2: MyReadonly<obj> = {
    id: 10,
    name: "madhavan",
};
// test2.id = 12;
// cannot assign id because it is a read-only property error is shown

let test3: MyPartial<obj> = {
    id: 101,
};

interface obj2 {
    id: number;
    name: {
        first: string;
        middle: string;
        last: string;
    };
}
let test4: MyDeepPartial<obj2> = {
    name: {
        first: "john wick",
    },
};
const bmw = { name: "BMW", power: "1000hp" };
console.log(propertyAccessor(bmw, "power"));

console.log(getPropertiesOfSpecificObject("id"));
