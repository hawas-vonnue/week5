"use strict";
let users = [];
function updateUser(id, changes) {
    return new Promise((resolve, reject) => {
        let user = users.find((u) => u.id === id);
        if (user) {
            let index = users.indexOf(user);
            let updatedUser = { ...user, ...changes };
            users.splice(index, 1, updatedUser);
            resolve(updatedUser);
        }
        else
            reject("error");
    });
}
function createRequiredUser(data) {
    users.push(data);
    return data;
}
function usersPreview() {
    return users.map((user) => {
        return {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
        };
    });
}
function createUser(user) {
    let createdUser = {
        id: String(crypto.randomUUID()),
        name: user.name,
        email: user.email,
        avatar: user?.avatar,
        createdAt: String(new Date()),
    };
    return createdUser;
}
//--------------------------------------------Test------------------------------
let user1 = {
    id: "101",
    name: "voldermort",
    email: "email@gmail.com",
};
let user2 = {
    id: "121",
    name: "Snape",
    email: "email@gmail.com",
};
let user3 = {
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
    console.log("-------------------------Testing updateUser-----------------------");
    console.log(response);
    console.log(typeof response);
    console.log(response.email);
    console.log(users);
})
    .catch((error) => {
    console.log(error);
});
console.log("-----------------------Testing createRequiredUser------------------");
console.log(createRequiredUser(user3));
console.log(users);
console.log("------------------------Testing usersPreview-----------------------");
console.log(usersPreview());
let userInput = {
    name: "malfoy",
    email: "email4@gmail.com",
    avatar: "new_img.jpg",
};
console.log("------------------------Testing createUser-------------------------");
console.log(createUser(userInput));
