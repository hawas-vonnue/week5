export {};
interface validationResult {
    id: number;
    pass: boolean;
}

interface Serializable {
    toJSON(): string;
    fromJSON(data: string): this;
}

interface Printable {
    print(): void;
    getDisplayName(): string;
}

interface Validatable {
    validate(): validationResult;
}

interface documentObject {
    id: number;
    name: string;
    title: string;
    description?: string;
}

class Document implements Serializable, Printable, Validatable {
    document: documentObject;

    constructor(obj: documentObject) {
        this.document = obj;
    }

    print() {
        console.log(this.document.id, this.document.name);
        console.log("title:", this.document.title);
        console.log("description:", this.document?.description);
    }

    getDisplayName(): string {
        return this.document.name;
    }

    toJSON(): string {
        return JSON.stringify(this.document);
    }

    fromJSON(data: string): this {
        let obj: documentObject = JSON.parse(data);
        this.document = obj;

        return this;
    }

    validate(): validationResult {
        return {
            id: 101,
            pass: this.document.description !== undefined,
        };
    }
}

let obj = {
    id: 101,
    name: "Dofflamingo",
    title: "1983",
    description: "this is description",
};

let plainObject = {
    toJSON(): string {
        return JSON.stringify(obj);
    },
    fromJSON(data: string) {
        let obj: documentObject = JSON.parse(data);

        return this;
    },
};

let serializableObject: Serializable = plainObject;

//--------------------------Test------------------------

const document = new Document(obj);
document.print();
let objJson = document.toJSON();
console.log(objJson);
console.log(document.fromJSON(objJson));
console.log(document.validate());
