import { fetchJson } from "../utils/apiClient";
global.fetch = jest.fn().mockImplementation(() => {
    return {
        ok: false,
    };
});
describe("testing fetchJson", () => {
    test("error thrown", async () => {
        await expect(fetchJson("hi", {})).rejects.toThrow();
    });
});
