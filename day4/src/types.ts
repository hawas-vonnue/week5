/** represents object with imdbID of type string */
export interface ParamsInterface {
    imdbID?: string;
}

/** Action interface differes based on which type is so the payload differs accordingly
 */
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

/** 
It represents state of the store.
It contain route and list of movies in watchList.
*/
export interface State {
    /** represents path and parameter in url */
    route: {
        path: string;
        params: object;
    };
    /** represents list of movies in watchlist */
    moviesList: Set<string>;
}

export type types = "ROUTE_CHANGED" | "MOVIESLIST_CHANGED" | "ON_LOAD";
