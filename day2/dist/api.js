"use strict";
let users = [];
function handleResponse(response) {
    if (response.success === true) {
        console.log("sucess");
        console.log("data is", response.data);
    }
    else {
        console.log("errror", response.error);
    }
}
function stateResponder(state) {
    let stringValue;
    switch (state.status) {
        case "idle":
            stringValue = `<span>idle</span>`;
            break;
        case "loading":
            stringValue = `<span class="spinner">Loading</span>`;
            break;
        case "success":
            stringValue = `<div>${JSON.stringify(state.data)}</div>`;
            break;
        case "error":
            stringValue = `<span class="error>${state.error}</span>`;
            break;
        default:
            const _exhaustiveCheck = state;
            stringValue = "";
            break;
    }
    return stringValue;
}
//----------------------------Test-------------------------------
let user1 = {
    id: "101",
    name: "fadhil",
    email: "hello@gmail.com",
    createdAt: "10-01-2004",
};
users.push(user1);
let state = {
    status: "success",
    data: users,
};
let state2 = {
    status: "loading",
};
let state3 = {
    status: "error",
    error: new Error("error"),
};
let state4 = {
    status: "idle",
};
console.log(stateResponder(state));
console.log(stateResponder(state2));
console.log(stateResponder(state3));
console.log(stateResponder(state4));
