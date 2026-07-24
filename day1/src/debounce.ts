// export function debounce(fn: () => void, time = 300): void {
//     setTimeout(() => {
//         fn();
//     }, time);
// }
function debounce(
    this: void,
    func: (...args: unknown[]) => void,
    wait: number
) {
    let timeout: number;
    return (...args: unknown[]) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

//-----Test---------//

function display() {
    console.log("hello world");
}
let deboucedDisplay = debounce(display, 3000);
deboucedDisplay();
deboucedDisplay();
setTimeout(deboucedDisplay, 3001);
