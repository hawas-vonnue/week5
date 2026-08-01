import { renderHomePage } from "./pages/home.js";
import { renderListPage } from "./pages/list.js";
import { renderDetailPage } from "./pages/detail.js";
import { renderSettingsPage } from "./pages/settings.js";
import { renderWatchList } from "./pages/watchlist.js";
import { createModal, navigate } from "./utils/util.js";
import { register } from "./utils/util.js";
import { createStore } from "./utils/util.js";
import { reducer } from "./utils/util.js";
import { renderUpdatedMoviesList } from "./utils/util.js";
const routes = [
    "/day5/index.html/home",
    "/day5/index.html/list",
    "/day5/index.html/detail",
    "/day5/index.html/settings",
    "/day5/index.html/watchlist",
];
export const routesMap = {};
register(routesMap, routes[0], renderHomePage);
register(routesMap, routes[1], renderListPage);
register(routesMap, routes[2], renderDetailPage);
register(routesMap, routes[3], renderSettingsPage);
register(routesMap, routes[4], renderWatchList);
export function addAnchorEventListeners() {
    const links = document.querySelectorAll("a");
    links.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            let pathname = document.location.pathname;
            pathname = `/day5/index.html`;
            if (event.target instanceof HTMLElement) {
                const url = `${pathname}/${event.target.id}`;
                history.pushState({}, "", url);
                onRouteChange(url, {});
            }
        });
    });
}
addAnchorEventListeners();
window.onload = (event) => {
    init();
};
window.addEventListener("popstate", (event) => {
    init();
});
function init() {
    let pathname = document.location.pathname;
    let obj = {};
    if (pathname.includes(":")) {
        const pathnames = pathname.split("/");
        pathname = pathnames.slice(0, -1).join("/");
        const imdbId = pathnames[pathnames.length - 1].slice(1);
        obj = { imdbID: imdbId };
    }
    if (routes.includes(pathname)) {
        onRouteChange(pathname, obj);
    }
    else {
        const url = `/day5/index.html/home`;
        history.replaceState({}, "", url);
        onRouteChange(url, obj);
    }
}
// initial state
const initialstate = {
    route: {
        path: "",
        params: {},
    },
    moviesList: new Set(),
};
export const store = createStore(initialstate, reducer);
// Called whenever the route changes
export function onRouteChange(path, params) {
    store.dispatch({
        type: "ROUTE_CHANGED",
        payload: {
            path,
            params,
        },
    });
}
export async function onMoviesListChange(type, id) {
    await store.dispatch({
        type: "MOVIESLIST_CHANGED",
        payload: { type, id },
    });
}
// Component subscribes to state changes
store.subscribe("ROUTE_CHANGED", (state) => {
    navigate(routesMap, state.route.path, state.route.params);
    renderUpdatedMoviesList(state);
});
store.subscribe("MOVIESLIST_CHANGED", (state) => {
    // updateMovieList(state);
    renderUpdatedMoviesList(state);
});
const overlay = createModal();
document.body.prepend(overlay);
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        const overlay1 = document.querySelector(".overlay");
        if (overlay1 instanceof HTMLElement) {
            if (overlay1?.style.display !== "none")
                overlay1.style.display = "none";
        }
    }
});
