import { ApiClient } from "../utils/apiClient";
import fetch from "cross-fetch";
// global.fetch = jest.fn().mockImplementation((args) => {
//     return args;
// });
global.fetch = fetch;
describe("testing api client", () => {
    const apiClient = new ApiClient("https://jsonplaceholder.typicode.com");
    test("get", async () => {
        let response = await apiClient.get("/posts/1");
        expect(typeof response).toBe("object");
    });
    test("post", async () => {
        let body = JSON.stringify({
            title: "title of post",
            body: "body of post",
            id: 111,
        });
        let response = await apiClient.post("/posts", body);
        expect(typeof response).toBe("object");
    });
    test("put", async () => {
        let body = JSON.stringify({
            id: 1,
            name: "hello",
        });
        let response = await apiClient.put("/posts/1", body);
        expect(typeof response).toBe("object");
    });
    test("delete", async () => {
        let response = await apiClient.delete("/posts/1");
        expect(typeof response).toBe("object");
    });
});
