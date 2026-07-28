"use strict";
class BankAccount {
    balance;
    accountNumber;
    owner;
    //in compiled output typescript private is just normal public property,the checks for typescript private is done in compile time whereas for javascript private in compiled output # is there it is a language implementation itself
    typescriptPrivate;
    #jsPrivate;
    constructor(balance, accountNumber, owner) {
        this.balance = balance;
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.balance = balance;
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.typescriptPrivate = "typesScriptPrivate";
        this.#jsPrivate = "jsPrivate";
    }
    transfer(amount) {
        this.balance = this.balance + amount;
        console.log(this.balance);
    }
}
class SavingsAccount extends BankAccount {
    constructor(balance, accountNumber, owner) {
        super(balance, accountNumber, owner);
    }
    transferTo(amount) {
        this.transfer(amount);
    }
}
const account = new SavingsAccount(1000, 101, "Dhamodharan unni");
account.transferTo(100);
