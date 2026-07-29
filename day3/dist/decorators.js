"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let User = class User {
    users;
    constructor() {
        this.users = [];
    }
    addUser(id, name) {
        let newUser = { id, name };
        this.users.push(newUser);
        return newUser;
    }
};
__decorate([
    log
], User.prototype, "addUser", null);
User = __decorate([
    sealed
], User);
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
function log(target, propertyKey, descriptor) {
    console.log("name of the function is:", propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log("The method args are:", args);
        const result = originalMethod.apply(this, args);
        console.log("The return value is:", result);
        return result;
    };
    return descriptor;
}
const user = new User();
user.addUser("101", "Adam smith");
