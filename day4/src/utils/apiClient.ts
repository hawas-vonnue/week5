export async function fetchJson<T>(url: string, options: object): Promise<T> {
    let responseJson;
    try {
        const response = await fetch(url, options);
        console.log(response);
        if (!response.ok) {
            throw new Error("Error while fetching");
        }
        responseJson = await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }

    return responseJson;
}

export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async responseInterceptor<T>(response: T) {
        //intercepts response here
        console.log("response is intercepted here");
        console.log(response);

        return response;
    }

    async requestInterceptor<T, B>(path: string, option: object): Promise<T> {
        let url = this.baseUrl + path;
        let result = await fetchJson<T>(url, option);

        return this.responseInterceptor(result);
    }

    async get<T>(path: string): Promise<T> {
        return this.requestInterceptor(path, {});
    }

    async post<T, B>(path: string, body: B): Promise<T> {
        return this.requestInterceptor(path, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: body,
        });
    }

    async put<T, B>(path: string, body: B): Promise<T> {
        return this.requestInterceptor(path, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: body,
        });
    }

    async delete<T>(path: string): Promise<T> {
        return this.requestInterceptor(path, {
            method: "DELETE",
        });
    }
}
