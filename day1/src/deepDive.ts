//when no implicit any turned on this shows error

function greet(str) {
    console.log(str);
}

//when strictNullChecks is not turned it wont show error here this is a real bug
function double(num) {
    if (typeof num === "number") return num * 2;
}

console.log(double("hello") * 2);

//when strictFunctionTypes flag is false this doesnt show error
function greet2(str: string): void {
    console.log("hello ", str.toUpperCase());
}

type stringOrNumberFunc = (arg: string | number) => void;
const greetDuplicate: stringOrNumberFunc = greet2;
greetDuplicate(11);

//when noUncheckedIndexedAccess catches following bug but you
//have to strictNullChecks flag also turned true because
//noUnckedIndexedAccess returns undefined and strictNullChecks
//catch that
let arr: string[] = [];
console.log(arr[0].toLowerCase());
