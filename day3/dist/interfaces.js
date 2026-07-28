class Document {
    document;
    constructor(obj) {
        this.document = obj;
    }
    print() {
        console.log(this.document.id, this.document.name);
        console.log("title:", this.document.title);
        console.log("description:", this.document?.description);
    }
    getDisplayName() {
        return this.document.name;
    }
    toJSON() {
        return JSON.stringify(this.document);
    }
    fromJSON(data) {
        let obj = JSON.parse(data);
        this.document = obj;
        return this;
    }
    validate() {
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
    toJSON() {
        return JSON.stringify(obj);
    },
    fromJSON(data) {
        let obj = JSON.parse(data);
        return this;
    },
};
let serializableObject = plainObject;
//--------------------------Test------------------------
const document = new Document(obj);
document.print();
let objJson = document.toJSON();
console.log(objJson);
console.log(document.fromJSON(objJson));
console.log(document.validate());
export {};
