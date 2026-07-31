import { describe } from "node:test";
import { reducer } from "../utils/util";
import { createStore } from "../utils/util";
describe("state manager test", () => {
    const initialState = {
        route: {
            path: "/",
            params: {},
        },
        moviesList: new Set(),
    };
    let reducer1 = jest
        .fn()
        .mockImplementation((state, action) => {
        return initialState;
    });
    let subscriberMock = jest.fn().mockImplementation(() => {
        console.log("subscriber function called");
    });
    const store1 = createStore(initialState, reducer1);
    test("dispatch action calles subscriber", () => {
        store1.subscribe("MOVIESLIST_CHANGED", subscriberMock);
        store1.dispatch({
            type: "MOVIESLIST_CHANGED",
            payload: {
                id: "",
                type: "add",
            },
        });
        expect(subscriberMock).toHaveBeenCalled();
    });
    const store2 = createStore(initialState, reducer);
    test("reducer test", () => {
        store2.subscribe("MOVIESLIST_CHANGED", subscriberMock);
        store2.dispatch({
            type: "MOVIESLIST_CHANGED",
            payload: {
                id: "",
                type: "add",
            },
        });
        expect(subscriberMock).toHaveBeenCalled();
    });
});
