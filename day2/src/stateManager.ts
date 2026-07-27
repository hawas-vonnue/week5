// Create Store
function createStore<S, A extends { type: string; payload: object }>(
    initialState: S,
    reducer: (state: S, action: A) => S
) {
    let state = initialState;
    const listeners: ((state: S) => void)[] = [];
    return {
        getState() {
            return state;
        },
        dispatch(action: A) {
            // Update state
            state = reducer(state, action);
            // Notify subscribers
            listeners.forEach((listener) => listener(state));
        },
        subscribe(listener: (state: S) => void) {
            listeners.push(listener);
        },
    };
}

interface kanbanState {
    tasks: { id: number; status: string }[];
}

// Initial State
const initialState: kanbanState = {
    tasks: [],
};
type kanbanBoardActionTypes = "ADD_CARD" | "REMOVE_CARD" | "MOVE_CARD";

// Reducer
function reducer(
    state: kanbanState,
    action: {
        type: kanbanBoardActionTypes;
        payload: {
            id: number;
            status: string;
        };
    }
): kanbanState {
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
                tasks: state.tasks.map((element) =>
                    element.id === action.payload.id
                        ? { ...element, status: action.payload.status }
                        : { ...element }
                ),
            };
        case "REMOVE_CARD":
            return {
                ...state,
                tasks: state.tasks.filter(
                    (element) => element.id !== action.payload.id
                ),
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
