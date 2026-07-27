"use strict";
function processInput(value) {
    if (typeof value === "boolean")
        console.log("boolean:", value);
    else if (value) {
        if (typeof value === "string")
            console.log("string ", value);
        else if (typeof value === "number")
            console.log("number ", value);
    }
    else {
        if (typeof value === "undefined")
            console.log("value is undefined");
        else
            console.log("value is null");
    }
}
function isUser(value) {
    return (typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "name" in value &&
        typeof value.id === "number" &&
        typeof value.name === "string");
}
function getArea(shape) {
    let area;
    switch (shape.kind) {
        case "circle":
            area = shape.radius * shape.radius * Math.PI;
            break;
        case "rect":
            area = shape.w * shape.h;
            break;
        default:
            const _exhaustiveSwitch = shape;
            return _exhaustiveSwitch;
    }
    return area;
}
//Shape varient 2 - never shows error if we use this and square case is not added in getArea cases
// type Shape =
//     | {
//           kind: "circle";
//           radius: number;
//       }
//     | {
//           kind: "rect";
//           w: number;
//           h: number;
//       }
//     | {
//           kind: "square";
//           l: number;
//       };
//-------------------Test-------------------------------
let a;
processInput("hello");
processInput(100);
processInput(false);
processInput(null);
processInput(a);
let user = { id: 1, name: "batman" };
let user2 = { id: "hello", name: "hii" };
console.log(isUser(user));
console.log(isUser(user2));
console.log(isUser("hello"));
let circle = {
    kind: "circle",
    radius: 10,
};
let rectangle = {
    kind: "rect",
    w: 12,
    h: 12,
};
console.log(getArea(circle));
console.log(getArea(rectangle));
