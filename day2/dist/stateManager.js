"use strict";
// Create Store
function createStore(initialState, reducer) {
    let state = initialState;
    const listeners = [];
    return {
        getState() {
            return state;
        },
        dispatch(action) {
            // Update state
            state = reducer(state, action);
            // Notify subscribers
            listeners.forEach((listener) => listener(state));
        },
        subscribe(listener) {
            listeners.push(listener);
        },
    };
}
// Initial State
const initialState = {
    tasks: [],
};
// Reducer
function reducer(state, action) {
    switch (action.type) {
        case "ADD_CARD":
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    { id: action.payload.id, status: action.payload.status },
                ],
            };
        case "MOVE_CARD":
            return {
                ...state,
                tasks: state.tasks.map((element) => element.id === action.payload.id
                    ? { ...element, status: action.payload.status }
                    : { ...element }),
            };
        case "REMOVE_CARD":
            return {
                ...state,
                tasks: state.tasks.filter((element) => element.id !== action.payload.id),
            };
        default:
            return state;
    }
}
const store = createStore(initialState, reducer);
//-----------------------------------------Testing------------------------------
store.dispatch({ type: "ADD_CARD", payload: { id: 10, status: "todo" } });
console.log(store.getState());
store.dispatch({
    type: "MOVE_CARD",
    payload: { id: 10, status: "pending" },
});
console.log(store.getState());
store.dispatch({ type: "REMOVE_CARD", payload: { id: 10, status: "delete" } });
console.log(store.getState());
