import { ApiClient } from "../utils/apiClient";
const mockUser = {
    id: 1,
    name: "John",
};
global.fetch = jest.fn().mockImplementation((args) => {
    return {
        ok: true,
        json: () => mockUser,
    };
});
describe("testing api client", () => {
    const apiClient = new ApiClient("https://jsonplaceholder.typicode.com");
    test("get", async () => {
        const response = await apiClient.get("/posts/1");
        expect(response).toBe(mockUser);
    });
    test("post", async () => {
        const body = JSON.stringify({
            title: "title of post",
            body: "body of post",
            id: 111,
        });
        const response = await apiClient.post("/posts", body);
        expect(response).toBe(mockUser);
    });
    test("put", async () => {
        const body = JSON.stringify({
            id: 1,
            name: "hello",
        });
        const response = await apiClient.put("/posts/1", body);
        expect(response).toBe(mockUser);
    });
    test("delete", async () => {
        const response = await apiClient.delete("/posts/1");
        expect(response).toBe(mockUser);
    });
});
