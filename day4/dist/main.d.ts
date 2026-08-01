import { State } from "./types.js";
export declare const routesMap: {};
export declare function addAnchorEventListeners(): void;
export declare const store: {
    getState(): State;
    dispatch(action: import("./types.js").actionInterface): Promise<void>;
    subscribe(type: import("./types.js").types, listener: (state: State) => void): void;
};
export declare function onRouteChange(path: string, params: object): void;
export declare function onMoviesListChange(type: "add" | "delete", id: string): Promise<void>;
