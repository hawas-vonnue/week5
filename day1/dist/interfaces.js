"use strict";
let obj1 = {
    id: 10,
    name: "pedri",
    email: "hawas@gmail.com",
    role: "admin",
    createdAt: "10-01-2004",
};
let obj2 = {
    id: 11,
    name: "rodri",
    email: "email@gmail.com",
    role: "editor",
    createdAt: "11-10-2023",
};
let obj3 = {
    id: 12,
    name: "feraaan",
    email: "email2@gmail.com",
    role: "viewer",
    createdAt: "22-10-2002",
};
let obj4 = {
    id: 13,
    name: "cubarsi",
    email: "email3@gmail.com",
    role: "admin",
    createdAt: "10-10-2010",
    avatar: "/img.jpg",
};
let obj5 = {
    id: 14,
    name: "olmo",
    email: "email4@gmail.com",
    role: "admin",
    createdAt: "11-11-2011",
};
const readonlyUser = {
    id: 15,
    name: "laporte",
    email: "email5@gmail.com",
    role: "viewer",
    createdAt: "23-10-2021",
};
//cannot do this becaue it is a read only property
// readonlyUser.id = 12;
function updateUser(user, changes) {
    console.log({ ...user });
    console.log({ ...changes });
    return { ...user, ...changes };
}
const newObj = updateUser(obj5, { id: 33, name: "new name" });
console.log(newObj);
let sentenceOfValue = {
    text: "hello world",
    whitespace: true,
};
//cannot do this in type
// type sentence = {
//     text: "hii world";
// };
