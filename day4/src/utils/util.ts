import { onRouteChange } from "../main.js";
import { onMoviesListChange } from "../main.js";
import { showToast } from "./showToast.js";
import { searchMovie } from "./searchMovie.js";
import { State, types, actionInterface, ParamsInterface } from "../types.js";

/**To register a path and associated function to SPA */
export function register(
    routes: Record<string, Function>,
    path: string,
    component: Function
) {
    routes[path] = component;
}

/** To call the function associated with the path and params */
export async function navigate(
    routes: Record<string, Function>,
    path: string,
    params: ParamsInterface
) {
    const fn = routes[path];
    if (params !== undefined && Object.keys(params).length !== 0)
        await fn(params.imdbID);
    else await fn();
}

export function createButton(text: string, backgroundColor = "white") {
    const button = document.createElement("button");
    button.textContent = text;
    button.style.backgroundColor = backgroundColor;
    button.style.padding = "3px 6px";
    button.style.border = "none";
    button.style.borderRadius = "8px";

    return button;
}

/** Create a movie card with details */
export function createCard(
    name: string,
    rating: string,
    genres: string[],
    posterSrc: string,
    year: string,
    imdbID: string | null = null,
    button: string = "false"
) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    if (imdbID) {
        cardElement.dataset.imdbId = imdbID;
        cardElement.id = imdbID;
    }
    const imageElement = document.createElement("img");
    imageElement.src = posterSrc;
    imageElement.addEventListener("error", (event) => {
        if (event.target instanceof HTMLImageElement)
            event.target.src = "https://picsum.photos/200/300";
    });
    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("description");
    const nameElement = document.createElement("h3");
    nameElement.textContent = `${name} (${year})`;
    const ratingElement = document.createElement("span");
    ratingElement.classList.add("rating");
    ratingElement.innerHTML = `<span >${rating}</span>&starf;`;
    const genreContainer = document.createElement("div");
    genreContainer.classList.add("genreContainer");
    for (let i = 0; i < genres.length; i++) {
        if (i === 3) break;
        const button = createButton(genres[i], "ghostwhite");
        genreContainer.appendChild(button);
    }
    descriptionElement.append(nameElement, ratingElement, genreContainer);
    if (button === "true") {
        const button = document.createElement("button");
        button.textContent = "watched";
        button.classList.add("watchedButton");
        descriptionElement.append(button);

        button.addEventListener("click", async (event) => {
            if (event.currentTarget instanceof HTMLElement) {
                const cardToDelete =
                    event.currentTarget!.parentElement!.parentElement;
                await onMoviesListChange("delete", cardToDelete!.id);
                showToast("removed from watchlist", 3, "success");
            }
        });
    }
    cardElement.append(imageElement, descriptionElement);
    cardElement.addEventListener("click", (event) => {
        if (
            event.target instanceof HTMLElement &&
            event.target.className === "watchedButton"
        )
            return;

        if (event.currentTarget instanceof HTMLElement) {
            const imdbId = event.currentTarget.dataset.imdbId;
            let pathname = document.location.pathname;
            pathname = pathname.split("/").slice(0, -1).join("/");
            const url = `${pathname}/detail/:${imdbId}`;
            history.pushState({}, "", url);
            onRouteChange(`${pathname}/detail`, { imdbID: imdbId });
        }
    });

    return cardElement;
}

/**Creates a modal which has search option for movie */
export function createModal() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const searchElement = document.createElement("div");
    searchElement.classList.add("search");
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("placeholder", "type here to search the movie");
    const searchButton = document.createElement("button");
    searchButton.classList.add("searchButton");
    searchButton.textContent = "Search";
    searchElement.append(inputElement, searchButton);
    const spinnerElement = document.createElement("div");
    spinnerElement.classList.add("spinner");
    spinnerElement.classList.add("hidden");
    const warningElement = document.createElement("span");
    warningElement.classList.add("warning");
    const searchResultContainer = document.createElement("div");
    searchResultContainer.classList.add("searchResultContainer");
    const closeOverlayButton = document.createElement("button");
    closeOverlayButton.classList.add("closeOverlayButton");
    closeOverlayButton.textContent = "x";
    overlay.append(
        searchElement,
        spinnerElement,
        warningElement,
        searchResultContainer,
        closeOverlayButton
    );

    closeOverlayButton.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    searchButton.addEventListener("click", async () => {
        spinnerElement.classList.remove("hidden");
        searchResultContainer.innerHTML = "";
        warningElement.textContent = "";
        if (searchButton.previousElementSibling instanceof HTMLInputElement) {
            const searchValue = searchButton.previousElementSibling.value;
            if (searchValue === "") return;
            if (searchValue.length < 3) {
                warningElement.textContent = "Type at least three characters";
                spinnerElement.classList.add("hidden");

                return;
            }
            searchMovie(searchValue).then(
                (searchResults) => {
                    searchResultContainer.append(searchResults);
                    spinnerElement.classList.add("hidden");
                },
                (error) => {
                    warningElement.textContent = "No results found";
                    spinnerElement.classList.add("hidden");
                    console.log(error);
                }
            );
        }
    });

    return overlay;
}

/**Fetch and return the response.json() or throw error */
export async function fetchJson(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Http Error");
        }
        const responseJson = await response.json();

        return responseJson;
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
}

export function reducer(state: State, action: actionInterface): State {
    switch (action.type) {
        case "ROUTE_CHANGED":
            return {
                ...state,
                route: action.payload,
            };
        case "MOVIESLIST_CHANGED": {
            const list = state.moviesList;
            if (action.payload.type === "add") {
                list.add(action.payload.id);
                showToast(`added movie to watchlist`, 3, "success");
            }
            if (action.payload.type === "delete") {
                list.delete(action.payload.id);
            }
            return {
                ...state,
                moviesList: list,
            };
        }
        case "ON_LOAD":
            return {
                ...state,
                moviesList: action.payload.moviesList,
            };
        default:
            return state;
    }
}

/**store is used to store the state of the app and when the state is changed dispatch functions accordingly */
export function createStore(
    initialState: State,
    reducer: (state: State, action: actionInterface) => State
) {
    let state = initialState;
    const listeners: Record<types, ((state: State) => void)[]> = {
        MOVIESLIST_CHANGED: [],
        ROUTE_CHANGED: [],
        ON_LOAD: [],
    };

    return {
        getState() {
            return state;
        },

        async dispatch(action: actionInterface) {
            if (
                action.type === "MOVIESLIST_CHANGED" &&
                action.payload.type === "add" &&
                state.moviesList.has(action.payload.id)
            ) {
                showToast("movie already in watchlist", 3, "error");

                return;
            }
            // Update state
            state = reducer(state, action);

            //store updated state in local storage if type is MOVIESLIST_CHANGED
            if (action.type === "MOVIESLIST_CHANGED") {
                localStorage.setItem(
                    "moviesList",
                    JSON.stringify([...state.moviesList])
                );
            }
            if (action.type === "ROUTE_CHANGED") {
                const value = localStorage.getItem("moviesList");
                if (value !== null) {
                    const moviesString: string = JSON.parse(value);
                    const movies = new Set(moviesString);
                    state = reducer(state, {
                        type: "ON_LOAD",
                        payload: {
                            moviesList: movies,
                        },
                    });
                }
            }

            // Notify subscribers
            const listenersOfType = listeners[action.type];
            for (const listener of listenersOfType) {
                await listener(state);
            }
        },

        subscribe(type: types, listener: (state: State) => void) {
            if (!listeners[type]) {
                listeners[type] = [];
            }
            listeners[type].push(listener);
        },
    };
}

//use filepath = http://127.0.0.1:8080/Top_100_Movies.csv
//when testing (or in localhost )because cross-fetch needs absolute url
// else use filepath = "/Top_100_Movies.csv"

/** Parses csv and returns an object */
export async function parseCSV(
    filePath = "http://127.0.0.1:8080/Top_100_Movies.csv"
) {
    const response = await fetch(filePath);
    const data = await response.text();
    const lines = data.trim().split(/\r?\n/);

    const headers = parseLine(lines[0]);
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const values = parseLine(lines[i]);
        const obj: Record<string, string> = {};

        headers.forEach((header, index) => {
            obj[header] = values[index] ?? "";
        });

        result.push(obj);
    }

    return result;
}

function parseLine(line: string) {
    const values = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            values.push(current);
            current = "";
        } else {
            current += char;
        }
    }

    values.push(current);

    return values;
}

export function createSearchResultCard(
    title: string,
    year: string,
    posterSrc: string
) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.classList.add("searchResult");
    const imageElement = document.createElement("img");
    imageElement.src = posterSrc;
    imageElement.addEventListener("error", (event) => {
        if (event.target instanceof HTMLImageElement)
            event.target.src = "https://picsum.photos/200/300";
    });
    const descriptionElement = document.createElement("div");
    descriptionElement.classList.add("description");
    const nameElement = document.createElement("h3");
    nameElement.textContent = `${title} (${year})`;
    const addToWatchListButton = document.createElement("button");
    addToWatchListButton.classList.add("addToWatchListButton");
    addToWatchListButton.textContent = "add to watchlist";
    descriptionElement.append(nameElement, addToWatchListButton);
    cardElement.append(imageElement, descriptionElement);
    addToWatchListButton.addEventListener("click", async (event) => {
        if (event.currentTarget instanceof HTMLElement) {
            const imdbId =
                event.currentTarget!.parentElement!.parentElement!.dataset!
                    .imdbId;
            if (imdbId !== undefined) await onMoviesListChange("add", imdbId);
        }
    });

    return cardElement;
}

export async function addToWatchList(imdbId: string) {
    const overlay = document.querySelector(".overlay");
    const url = `https://www.omdbapi.com/?i=${imdbId}&page=1&apikey=cbd3390f`;
    let result;
    try {
        result = await fetchJson(url);
    } catch (error) {
        showToast("error in fetching ", 3, "error");
    }
    let rating;
    if (result.Ratings.length === 0) rating = "N/A";
    else rating = result.Ratings[0].Value;
    const genres = result.Genre.split(",");
    const card = createCard(
        result.Title,
        rating,
        genres,
        result.Poster,
        result.Year,
        result.imdbID,
        "true"
    );

    return card;
}

export async function renderUpdatedMoviesList(state: State) {
    if (!document.location.pathname.includes("watchlist")) return;
    const movies = state.moviesList;
    const moviesList = movies;
    const watchListContainer = document.querySelector(".watchListContainer");
    const documentFragment = document.createDocumentFragment();
    for (const movie of moviesList) {
        const card = await addToWatchList(movie);
        documentFragment.append(card);
    }
    const spinner = document.querySelector("main .spinner");
    watchListContainer!.replaceChildren(documentFragment);
    spinner!.classList.add("hidden");
}
