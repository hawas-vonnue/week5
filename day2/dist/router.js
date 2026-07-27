"use strict";
function register(routes, route) {
    routes.push(route);
}
function navigate(routes, path, params) {
    console.log(routes);
    console.log(path);
    let route = routes.filter((element) => element.path === path);
    if (route.length === 0)
        return;
    let element;
    if (params)
        element = route[0].component(params);
    else
        element = route[0].component();
    console.log(element);
}
//-----------------------------------Testing-----------------------------------
let routes = [];
let obj = { id: "101" };
function fn(obj) {
    const divElement = document.createElement("div");
    divElement.textContent = "hello ";
    divElement.textContent = divElement.textContent + obj?.id;
    return divElement;
}
register(routes, { path: "/", component: fn });
navigate(routes, "/", obj);
