function debounce(this: void, func: functionType, wait: number): functionType {
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
