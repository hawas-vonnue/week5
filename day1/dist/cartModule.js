"use strict";
class Observer {
    observers;
    constructor() {
        this.observers = [];
    }
    addObserver(fn) {
        this.observers.push(fn);
    }
    notifyObservers(data) {
        this.observers.forEach((observer) => {
            observer(data);
        });
    }
}
const listener = new Observer();
class Cart {
    items;
    constructor(...args) {
        this.items = args;
    }
    addItem(item) {
        let newCartItems = structuredClone(this.items);
        newCartItems.push(item);
        let newCart = new Cart(...newCartItems);
        listener.notifyObservers(newCart);
        return newCart;
    }
    removeItem(itemId) {
        let newCartItems = structuredClone(this.items);
        let newCart = new Cart(...newCartItems.filter((item) => item.id != itemId));
        listener.notifyObservers(newCart);
        return newCart;
    }
    updateQuantity(itemId, quantity) {
        let newCartItems = structuredClone(this.items);
        for (let item of newCartItems) {
            if (item.id === itemId)
                item.quantity = quantity;
        }
        let newCart = new Cart(...newCartItems);
        listener.notifyObservers(newCart);
        return newCart;
    }
    getTotal() {
        let total = 0;
        for (let item of this.items) {
            total = total + item.quantity * item.price;
        }
        return total;
    }
    applyCoupon(coupon) {
        let total = this.getTotal();
        let newValue = total - (coupon.discount * total) / 100;
        return newValue;
    }
}
//-----------------------Test---------------------------------------
let item1 = {
    id: 10,
    quantity: 11,
    price: 100,
};
let item2 = {
    id: 11,
    quantity: 2,
    price: 10,
};
let item3 = {
    id: 14,
    quantity: 10,
    price: 100,
};
function display(cart) {
    console.log("new cart:");
    for (let item of cart.items)
        console.log(item);
}
listener.addObserver(display);
const cart = new Cart(item1);
let newCartItems = cart.addItem(item2);
newCartItems = newCartItems.addItem(item3);
newCartItems = newCartItems.removeItem(14);
newCartItems = newCartItems.updateQuantity(11, 10);
