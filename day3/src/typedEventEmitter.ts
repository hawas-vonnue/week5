type func = (...x: unknown[]) => void;

class TypedEventEmitter<Events extends Record<string, unknown[]>> {
    // eventMap: Map<string, unknown[]>;

    // constructor() {
    //     this.eventMap = new Map();
    // }

    eventMap: {
        [K in keyof Events]?: ((...args: Events[K]) => void)[];
    } = {};

    // on<K extends keyof Events>(
    //     event: K,
    //     listener: (...args: Events[K]) => void
    // ): this {
    //     if (typeof event === "string") {
    //         if (!this.eventMap.has(event)) {
    //             this.eventMap.set(event, []);
    //         }
    //         this.eventMap?.get(event)?.push(listener);
    //     }

    //     return this;
    // }

    on<K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => void
    ): this {
        if (!this.eventMap[event]) {
            this.eventMap[event] = [];
        }
        this.eventMap[event]?.push(listener);

        return this;
    }

    // off<K extends keyof Events>(
    //     event: K,
    //     listener: (...args: Events[K]) => void
    // ) {
    //     if (typeof event === "string") {
    //         if (this.eventMap.has(event)) {
    //             const listerners = this.eventMap
    //                 ?.get(event)
    //                 ?.filter((fn) => fn != listener);
    //             if (listerners !== undefined)
    //                 this.eventMap.set(event, listerners);
    //         }
    //     }
    // }

    off<K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => void
    ) {
        if (this.eventMap[event]) {
            const listerners = this.eventMap[event]?.filter(
                (fn) => fn != listener
            );
            if (listerners !== undefined) this.eventMap[event] = listerners;
        }
    }

    // emit<K extends keyof Events>(event: K, ...args: Events[K]) {
    //     if (typeof event === "string") {
    //         if (this.eventMap.has(event)) {
    //             this.eventMap
    //                 ?.get(event)
    //                 ?.forEach((listener: (...args: Events[K]) => void) => {
    //                     listener(...args);
    //                 });
    //             if (this.eventMap.has("*")) {
    //                 let wildcardListeners = this.eventMap.get("*");
    //                 wildcardListeners?.forEach((wildcardListener) => {
    //                     wildcardListener(...args);
    //                 });
    //             }
    //         }
    //     }
    // }

    emit<K extends keyof Events>(event: K, ...args: Events[K]) {
        if (this.eventMap[event]) {
            this.eventMap[event]?.forEach(
                (listener: (...args: Events[K]) => void) => {
                    listener(...args);
                }
            );

            // if (this.eventMap["*"]) {
            //     let wildcardListeners = this.eventMap["*"];
            //     wildcardListeners?.forEach((wildcardListener) => {
            //         wildcardListener(...args);
            //     });
            // }
        }
    }

    once<K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => void
    ) {
        const wrapper = (...args: Events[K]) => {
            this.off(event, wrapper);
            listener(...args);
        };
        this.on(event, wrapper);
    }
}

interface User {
    id: string;
    name: string;
}

type UserEvents = {
    userAdded: [User];
    userRemoved: [string];
    userUpdated: [string, Partial<User>];
};

class UserStore extends TypedEventEmitter<UserEvents> {
    users: User[] = [];
    addUser(user: User) {
        this.users.push(user);
        this.emit("userAdded", user);
    }

    removeUser(id: string) {
        this.users = this.users.filter((element) => element.id !== id);
        this.emit("userRemoved", id);
    }

    updateUser(id: string, changes: Partial<User>) {
        let user = this.users.find((element) => element.id === id);
        if (user !== undefined) {
            let index = this.users.indexOf(user);
            user = { ...user, ...changes };
            this.users[index] = user;
        }

        this.emit("userUpdated", id, changes);
    }
}

//-------------------------Test-------------------------------------------------

let user1: User = {
    id: "101",
    name: "Mikhail Gorbachev",
};
let user2: User = {
    id: "121",
    name: "stalin",
};
let changes = {
    name: "Lenin",
};
const userStore = new UserStore();
userStore.on("userAdded", (user: User) => console.log("user added:", user));
userStore.on("userRemoved", (id: string) =>
    console.log(`user with id ${id} is removed`)
);
userStore.on("userUpdated", (id: string, changes: Partial<User>) => {
    console.log(`user with id ${id} changed to`, changes);
});
userStore.addUser(user1);
userStore.addUser(user2);
userStore.removeUser("101");
userStore.updateUser("121", changes);
