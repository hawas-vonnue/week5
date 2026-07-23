interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "viewer" | "editor";
    createdAt: string;
    avatar?: string;
}

let obj1: User = {
    id: 10,
    name: "pedri",
    email: "hawas@gmail.com",
    role: "admin",
    createdAt: "10-01-2004",
};
let obj2: User = {
    id: 11,
    name: "rodri",
    email: "email@gmail.com",
    role: "editor",
    createdAt: "11-10-2023",
};
let obj3: User = {
    id: 12,
    name: "feraaan",
    email: "email2@gmail.com",
    role: "viewer",
    createdAt: "22-10-2002",
};
let obj4: User = {
    id: 13,
    name: "cubarsi",
    email: "email3@gmail.com",
    role: "admin",
    createdAt: "10-10-2010",
    avatar: "/img.jpg",
};
let obj5: User = {
    id: 14,
    name: "olmo",
    email: "email4@gmail.com",
    role: "admin",
    createdAt: "11-11-2011",
};

const readonlyUser: Readonly<User> = {
    id: 15,
    name: "laporte",
    email: "email5@gmail.com",
    role: "viewer",
    createdAt: "23-10-2021",
};
//cannot do this becaue it is a read only property
// readonlyUser.id = 12;

function updateUser(user: User, changes: Partial<User>): User {
    console.log({ ...user });
    console.log({ ...changes });
    return { ...user, ...changes };
}
const newObj = updateUser(obj5, { id: 33, name: "new name" });
console.log(newObj);

//interface is open while type is closed
interface sentence1 {
    text: string;
}
interface sentence1 {
    whitespace: boolean;
}
let sentenceOfValue: sentence1 = {
    text: "hello world",
    whitespace: true,
};
type sentence = {
    text: "hello world";
};
//cannot do this in type
// type sentence = {
//     text: "hii world";
// };
