interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt?: string;
}
let users: User[] = [];

function updateUser(id: string, changes: Partial<User>): Promise<User> {
    return new Promise((resolve, reject) => {
        let user = users.find((u) => u.id === id);
        if (user) {
            let index = users.indexOf(user);
            let updatedUser = { ...user, ...changes } as User;
            users.splice(index, 1, updatedUser);

            resolve(updatedUser);
        } else reject("error");
    });
}

function createRequiredUser(data: Required<User>): User {
    users.push(data);
    return data;
}

type UserPreview = Pick<User, "id" | "name" | "avatar">;

function usersPreview(): UserPreview[] {
    return users.map((user): UserPreview => {
        return {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
        };
    });
}

type UserInput = Omit<User, "id" | "createdAt">;

function createUser(user: UserInput): User {
    let createdUser: User = {
        id: String(crypto.randomUUID()),
        name: user.name,
        email: user.email,
        avatar: user?.avatar,
        createdAt: String(new Date()),
    };

    return createdUser;
}

type ConfigKey = "name" | "place" | "occupation";
type config = Record<ConfigKey, string>;

//--------------------------------------------Test------------------------------

let user1: User = {
    id: "101",
    name: "voldermort",
    email: "email@gmail.com",
};
let user2: User = {
    id: "121",
    name: "Snape",
    email: "email@gmail.com",
};
let user3: Required<User> = {
    id: "133",
    name: "sirius black",
    email: "yahoo@yahoo.com",
    avatar: "img.jpg",
    createdAt: "10-10-2004",
};
let changes = {
    name: "Dumbledore",
};
users.push(user1);
users.push(user2);
updateUser("101", changes)
    .then((response) => {
        console.log(
            "-------------------------Testing updateUser-----------------------"
        );
        console.log(response);
        console.log(typeof response);
        console.log(response.email);
        console.log(users);
    })
    .catch((error) => {
        console.log(error);
    });

console.log(
    "-----------------------Testing createRequiredUser------------------"
);
console.log(createRequiredUser(user3));
console.log(users);

console.log(
    "------------------------Testing usersPreview-----------------------"
);
console.log(usersPreview());

let userInput: UserInput = {
    name: "malfoy",
    email: "email4@gmail.com",
    avatar: "new_img.jpg",
};
console.log(
    "------------------------Testing createUser-------------------------"
);
console.log(createUser(userInput));
