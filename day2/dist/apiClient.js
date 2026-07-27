"use strict";
async function fetchJson(url, options) {
    let responseJson;
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Error while fetching");
        }
        responseJson = await response.json();
    }
    catch (error) {
        if (error instanceof Error)
            throw new Error(error.message);
    }
    return responseJson;
}
class ApiClient {
    baseUrl;
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async responseInterceptor(response) {
        //intercepts response here
        console.log("response is intercepted here");
        console.log(response);
        return response;
    }
    async requestInterceptor(path, option) {
        let url = this.baseUrl + path;
        let result = await fetchJson(url, option);
        return this.responseInterceptor(result);
    }
    async get(path) {
        return this.requestInterceptor(path, {});
    }
    async post(path, body) {
        return this.requestInterceptor(path, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: body,
        });
    }
    async put(path, body) {
        return this.requestInterceptor(path, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: body,
        });
    }
    async delete(path) {
        return this.requestInterceptor(path, {
            method: "DELETE",
        });
    }
}
const MockApiClient = new ApiClient("https://jsonplaceholder.typicode.com");
let body = JSON.stringify({
    title: "title1",
    body: "body 1",
    userId: 101,
});
let body2 = JSON.stringify({
    id: 1,
    name: "hello",
    userId: 132,
});
MockApiClient.get("/posts/1").then((response) => {
    console.log("Get request:");
    console.log(response);
});
MockApiClient.post("/posts", body).then((response) => {
    console.log("post request:");
    console.log(response);
});
MockApiClient.put("/posts/1", body2).then((response) => {
    console.log("Put Request:");
    console.log(response);
});
MockApiClient.delete("/posts/1").then((response) => {
    console.log("Delete Request");
    console.log(response);
});
