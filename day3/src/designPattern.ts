type Observer<T> = (args: T) => void;
type Unsubscribe = () => void;

interface Observable<T> {
    subscribe(observer: Observer<T>): Unsubscribe;
}

class Subject<T> implements Observable<T> {
    observers: Observer<T>[];
    constructor() {
        this.observers = [];
    }

    subscribe(observer: Observer<T>): Unsubscribe {
        this.observers.push(observer);

        return () => {
            let index = this.observers.indexOf(observer);
            this.observers.splice(index, 1);
        };
    }
}

interface Command {
    execute(): void;
    undo(): void;
}

class CommandHistory {
    private history: Command[] = [];
    private redoQueue: Command[] = [];
    executeCommand(command: Command) {
        command.execute();
        this.history.push(command);
        this.redoQueue.length = 0;
    }
    undo() {
        let command = this.history.pop();
        if (command !== undefined) {
            command.undo();
            this.redoQueue.push(command);
        }
    }
    redo() {
        let command = this.redoQueue.pop();
        if (command !== undefined) {
            command.execute();
            this.history.push(command);
        }
    }
}

//-------------------------------------Test-------------------------------------

const subject = new Subject<string>();
let unsubscribe = subject.subscribe((name: string) => console.log(name));
const greet = (name: string) => console.log(`hello ${name}`);
subject.subscribe(greet);
console.log(subject.observers);
unsubscribe();
console.log(subject.observers);

let sum = 0;
const commands = new CommandHistory();
const increment: Command = {
    execute(): void {
        sum = sum + 1;
    },
    undo(): void {
        sum = sum - 1;
    },
};

const decrement: Command = {
    execute() {
        sum = sum - 1;
    },
    undo() {
        sum = sum + 1;
    },
};

const double: Command = {
    execute() {
        sum = sum * 2;
    },
    undo() {
        sum = sum / 2;
    },
};

commands.executeCommand(increment);
commands.executeCommand(increment);
commands.executeCommand(increment);
console.log(sum); //3
commands.executeCommand(decrement);
console.log(sum); //2
commands.undo();
console.log(sum); //3
commands.redo();
console.log(sum); //2
commands.executeCommand(increment);
commands.executeCommand(decrement);
commands.executeCommand(increment);
commands.executeCommand(increment);
commands.executeCommand(double);
console.log(sum); //8
// correctly reverses five commands
commands.undo();
commands.undo();
commands.undo();
commands.undo();
commands.undo();
console.log(sum); //2

commands.redo();
commands.redo();
commands.redo();
commands.redo();
commands.redo();
console.log(sum); //8

console.log(
    "---------------------------------------------------------------------"
);
commands.executeCommand(increment);
commands.executeCommand(increment);
commands.executeCommand(increment);
console.log(sum); //11
commands.undo();
console.log(sum); //10
commands.executeCommand(increment);
commands.undo();
console.log(sum); //10
commands.redo();
console.log(sum); //11
commands.redo();
console.log(sum); //11
