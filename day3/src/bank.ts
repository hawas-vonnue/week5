class BankAccount {
    //in compiled output typescript private is just normal public property,the checks for typescript private is done in compile time whereas for javascript private in compiled output # is there it is a language implementation itself
    private typescriptPrivate: string;
    #jsPrivate: string;

    constructor(
        private balance: number,
        readonly accountNumber: number,
        public readonly owner: string
    ) {
        this.balance = balance;
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.typescriptPrivate = "typesScriptPrivate";
        this.#jsPrivate = "jsPrivate";
    }
    protected transfer(amount: number) {
        this.balance = this.balance + amount;
        console.log(this.balance);
    }
}

class SavingsAccount extends BankAccount {
    constructor(balance: number, accountNumber: number, owner: string) {
        super(balance, accountNumber, owner);
    }
    transferTo(amount: number) {
        this.transfer(amount);
    }
}

const account = new SavingsAccount(1000, 101, "Dhamodharan unni");
account.transferTo(100);
