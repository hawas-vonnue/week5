import { fetchJson } from "./util.js";
import { createSearchResultCard } from "./util.js";
export async function searchMovie(name) {
    const url = `https://www.omdbapi.com/?s=${name}&page=1&apikey=cbd3390f`;
    const results = await fetchJson(url);
    if (results.Response === "False") {
        throw new Error("couldnt find results");
    }
    const movieArray = results.Search;
    const documentFragment = document.createDocumentFragment();
    for (const movie of movieArray) {
        const card = createSearchResultCard(movie.Title, movie.Year, movie.Poster);
        card.dataset.imdbId = movie.imdbID;
        documentFragment.append(card);
    }
    return documentFragment;
}
