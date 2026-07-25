import { getSum } from "../src/types/test_library.js";
//
// /home/hawas.backer/Desktop/week5/day1/src/types/test_library
//typescript shows error - so type is working
// getSum("hello", "hii");
console.log(getSum(10, 30));
// satisfies operator
const palette = {
    primary: "#0D9488",
};
// it is better to use satisfies instead of type annotation when we just want to check if expression is of some type but we dont want to change the type of resulting expression.
