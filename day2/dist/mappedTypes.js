"use strict";
function propertyAccessor(obj, key) {
    return obj[key];
}
let object1 = {
    id: "hello",
    name: "william shakesphere",
    hobby: "writing",
};
//because task asked to use combination of keyof and typeof for generic getaccessor keyof is the only thing needed.
function getPropertiesOfSpecificObject(key) {
    return object1[key];
}
let test2 = {
    id: 10,
    name: "madhavan",
};
// test2.id = 12;
// cannot assign id because it is a read-only property error is shown
let test3 = {
    id: 101,
};
let test4 = {
    name: {
        first: "john wick",
    },
};
const bmw = { name: "BMW", power: "1000hp" };
console.log(propertyAccessor(bmw, "power"));
console.log(getPropertiesOfSpecificObject("id"));
