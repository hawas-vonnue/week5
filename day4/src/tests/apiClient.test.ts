import { ApiClient } from "@utils/apiClient";
import fetch from "cross-fetch";

// global.fetch = jest.fn().mockImplementation((args) => {
//     return args;
// });

global.fetch = fetch;

describe("testing api client", () => {
    const apiClient = new ApiClient("https://jsonplaceholder.typicode.com");

    test("get", async () => {
        let response = await apiClient.get<object>("/posts/1");
        expect(typeof response).toBe("object");
    });

    test("post", async () => {
        let body = JSON.stringify({
            title: "title of post",
            body: "body of post",
            id: 111,
        });
        let response: string = await apiClient.post<string, typeof body>(
            "/posts",
            body
        );
        expect(typeof response).toBe("object");
    });

    test("put", async () => {
        let body = JSON.stringify({
            id: 1,
            name: "hello",
        });

        let response = await apiClient.put<object, typeof body>(
            "/posts/1",
            body
        );
        expect(typeof response).toBe("object");
    });

    test("delete", async () => {
        let response = await apiClient.delete<object>("/posts/1");
        expect(typeof response).toBe("object");
    });
});
