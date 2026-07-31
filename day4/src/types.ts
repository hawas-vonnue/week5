export interface ParamsInterface {
    imdbID?: string;
}

export type actionInterface = RouteChanged | MovieListChanged | onLoadInterface;

export interface RouteChanged {
    type: "ROUTE_CHANGED";
    payload: {
        path: string;
        params: ParamsInterface;
    };
}

export interface MovieListChanged {
    type: "MOVIESLIST_CHANGED";
    payload: {
        id: string;
        type: "add" | "delete";
    };
}

export interface onLoadInterface {
    type: "ON_LOAD";
    payload: {
        moviesList: Set<string>;
    };
}

export interface State {
    route: {
        path: string;
        params: object;
    };
    moviesList: Set<string>;
}

export type types = "ROUTE_CHANGED" | "MOVIESLIST_CHANGED" | "ON_LOAD";
