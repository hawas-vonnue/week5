export async function fetchJson(url, options) {
    let responseJson;
    try {
        const response = await fetch(url, options);
        console.log(response);
        if (!response.ok) {
            throw new Error("Error while fetching");
        }
        responseJson = await response.json();
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
    return responseJson;
}
export class ApiClient {
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
        const url = this.baseUrl + path;
        const result = await fetchJson(url, option);
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
