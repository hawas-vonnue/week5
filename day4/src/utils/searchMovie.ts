import { fetchJson } from "./util.js";
import { createSearchResultCard } from "./util.js";

export async function searchMovie(name: string) {
    let url = `https://www.omdbapi.com/?s=${name}&page=1&apikey=cbd3390f`;
    let results = await fetchJson(url);
    if (results.Response === "False") {
        throw new Error("couldnt find results");
    }
    let movieArray = results.Search;
    const documentFragment = document.createDocumentFragment();
    for (let movie of movieArray) {
        let card = createSearchResultCard(
            movie.Title,
            movie.Year,
            movie.Poster
        );
        card.dataset.imdbId = movie.imdbID;

        documentFragment.append(card);
    }

    return documentFragment;
}
