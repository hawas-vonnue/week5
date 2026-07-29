interface UserInterface {
    id: string;
    name: string;
}

@sealed
class User {
    users: UserInterface[];
    constructor() {
        this.users = [];
    }
    @log
    addUser(id: string, name: string) {
        let newUser = { id, name };

        this.users.push(newUser);

        return newUser;
    }
}

function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

function log(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
) {
    console.log("name of the function is:", propertyKey);
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log("The method args are:", args);
        const result = originalMethod.apply(this, args);
        console.log("The return value is:", result);

        return result;
    };
    return descriptor;
}

const user: User = new User();
user.addUser("101", "Adam smith");
