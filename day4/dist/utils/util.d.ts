import { State, types, actionInterface, ParamsInterface } from "../types.js";
export declare function register(routes: Record<string, Function>, path: string, component: Function): void;
export declare function navigate(routes: Record<string, Function>, path: string, params: ParamsInterface): Promise<void>;
export declare function createButton(text: string, backgroundColor?: string): HTMLButtonElement;
export declare function createCard(name: string, rating: string, genres: string[], posterSrc: string, year: string, imdbID?: string | null, button?: string): HTMLDivElement;
export declare function createModal(): HTMLDivElement;
export declare function fetchJson(url: string): Promise<any>;
export declare function reducer(state: State, action: actionInterface): State;
export declare function createStore(initialState: State, reducer: (state: State, action: actionInterface) => State): {
    getState(): State;
    dispatch(action: actionInterface): Promise<void>;
    subscribe(type: types, listener: (state: State) => void): void;
};
export declare function parseCSV(filePath?: string): Promise<Record<string, string>[]>;
export declare function createSearchResultCard(title: string, year: string, posterSrc: string): HTMLDivElement;
export declare function addToWatchList(imdbId: string): Promise<HTMLDivElement>;
export declare function renderUpdatedMoviesList(state: State): Promise<void>;
