interface cartItem {
    id: number;
    quantity: number;
    price: number;
}
interface couponInterface {
    name: string;
    discount: number;
}
interface cartInterface {
    items: cartItem[];
    addItem: (item: cartItem) => cartInterface;
    removeItem: (itemId: number) => cartInterface;
    updateQuantity: (itemId: number, quantity: number) => cartInterface;
    getTotal: () => number;
    applyCoupon: (coupon: couponInterface) => number;
}

type observersInterface = Array<(state: cartInterface) => void>;

class Observer {
    observers: observersInterface;
    constructor() {
        this.observers = [];
    }
    addObserver(fn: (state: cartInterface) => void) {
        this.observers.push(fn);
    }
    notifyObservers(data: cartInterface) {
        this.observers.forEach((observer) => {
            observer(data);
        });
    }
}
const listener = new Observer();

class Cart implements cartInterface {
    items: cartItem[];

    constructor(...args: cartItem[]) {
        this.items = args;
    }

    addItem(item: cartItem): cartInterface {
        let newCartItems = structuredClone(this.items);
        newCartItems.push(item);

        let newCart = new Cart(...newCartItems);
        listener.notifyObservers(newCart);

        return newCart;
    }

    removeItem(itemId: number): cartInterface {
        let newCartItems = structuredClone(this.items);
        let newCart = new Cart(
            ...newCartItems.filter((item) => item.id != itemId)
        );
        listener.notifyObservers(newCart);

        return newCart;
    }

    updateQuantity(itemId: number, quantity: number): cartInterface {
        let newCartItems = structuredClone(this.items);
        for (let item of newCartItems) {
            if (item.id === itemId) item.quantity = quantity;
        }
        let newCart = new Cart(...newCartItems);
        listener.notifyObservers(newCart);

        return newCart;
    }

    getTotal(): number {
        let total = 0;
        for (let item of this.items) {
            total = total + item.quantity * item.price;
        }

        return total;
    }

    applyCoupon(coupon: couponInterface): number {
        let total = this.getTotal();
        let newValue = total - (coupon.discount * total) / 100;

        return newValue;
    }
}

//-----------------------Test---------------------------------------
let item1: cartItem = {
    id: 10,
    quantity: 11,
    price: 100,
};
let item2: cartItem = {
    id: 11,
    quantity: 2,
    price: 10,
};
let item3: cartItem = {
    id: 14,
    quantity: 10,
    price: 100,
};

function display(cart: cartInterface) {
    console.log("new cart:");
    for (let item of cart.items) console.log(item);
}
listener.addObserver(display);

const cart = new Cart(item1);
let newCartItems = cart.addItem(item2);
newCartItems = newCartItems.addItem(item3);
newCartItems = newCartItems.removeItem(14);
newCartItems = newCartItems.updateQuantity(11, 10);
