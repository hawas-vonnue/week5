import { renderDetailPage } from "@pages/detail";
import { displayOverlay, renderWatchList } from "@pages/watchlist";
import { createModal } from "@utils/util";
import * as searchMovieModule from "@utils/searchMovie";

const flushPromises = () =>
    new Promise(jest.requireActual("timers").setImmediate);

const fetch = require("cross-fetch");
global.fetch = fetch;

describe("details page test:", () => {
    document.body.innerHTML = `
        <header>
            <nav>
                <a href="" id="home">Home</a>
                <a href="" id="list">List</a>
                <a href="" id="watchlist">Watchlist</a>
                <a href="" id="settings">Settings</a>
            </nav>
        </header>
        <main></main>
        <div class="hidden">
            <div class="detailedCard">
                <img
                    src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg"
                    alt="movie poster"
                />
                <div class="details">
                    <div class="headingSection">
                        <h2>Avengers: Infinity War</h2>
                        <span class="rating"><span>9.0</span>&starf;</span>
                    </div>
                    <div class="subDetails">
                        <span class="year">2018</span>
                        |
                        <span class="runtime">123m</span>
                        |
                        <span class="rated">16+</span>
                    </div>
                    <div class="overview">
                        <h3>OVERVIEW</h3>
                        <div class="overviewDetailsContainer">
                            <span class="plot"
                                >A thief who steals corporate secrets through
                                the use of dream-sharing technology is given the
                                inverse task of planting an idea into the mind
                                of a CEO, but his tragic past may doom the
                                project and his team to disaster.</span
                            >
                            <span class="fields">
                                <span class="field">
                                    <span class="label">Starring</span>
                                    <span class="value"
                                        >Leonardo DiCaprio, Joseph
                                        Gordon-Levitt, Elliot Page</span
                                    >
                                </span>
                                <span class="field">
                                    <span class="label">Genre</span>
                                    <span class="value"
                                        >Action, Adventure, Sci-Fi</span
                                    >
                                </span>
                                <span class="field">
                                    <span class="label">Director</span>
                                    <span class="value"
                                        >Christopher Nolan
                                    </span>
                                </span>
                                <span class="field">
                                    <span class="label">Languages</span>
                                    <span class="value">
                                        English, Japanese, French
                                    </span>
                                </span>
                                <span class="field">
                                    <span class="label">Awards</span>
                                    <span class="value">
                                        Won 4 Oscars. 160 wins & 220 nominations
                                        total
                                    </span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    test("rendering correctly", async () => {
        await renderDetailPage("tt2543164");
        const detailPage = document.querySelector(".detail");
        expect(detailPage).not.toBe(null);
    });
});
describe("watchList page", () => {
    test("overlay opens", async () => {
        document.body.innerHTML = `
        <header>
            <nav>
                <a href="" id="home">Home</a>
                <a href="" id="list">List</a>
                <a href="" id="watchlist">Watchlist</a>
                <a href="" id="settings">Settings</a>
            </nav>
        </header>
        <main></main>
    `;
        const overlay = createModal();
        renderWatchList();
        const addButton = document.querySelector("button");
        expect(() => {
            displayOverlay();
        }).toThrow();
        document.body.append(overlay);

        addButton!.click();

        expect(overlay.style.display).toBe("flex");
    });
    test("overlay closes", async () => {
        document.body.innerHTML = `
        <header>
            <nav>
                <a href="" id="home">Home</a>
                <a href="" id="list">List</a>
                <a href="" id="watchlist">Watchlist</a>
                <a href="" id="settings">Settings</a>
            </nav>
        </header>
        <main></main>
    `;
        const overlay = createModal();
        renderWatchList();
        const addButton = document.querySelector("button");
        document.body.append(overlay);
        addButton!.click();

        const closeButton = document.querySelector(".closeOverlayButton");
        if (closeButton instanceof HTMLElement) {
            closeButton!.click();
            expect(overlay.style.display).toBe("none");
        }
        addButton!.click();

        const keyboardEvent = new KeyboardEvent("keydown", {
            key: "Escape",
            code: "Escape",
        });

        window.dispatchEvent(keyboardEvent);
        expect(overlay.style.display).toBe("none");
    });

    test("search button works", async () => {
        document.body.innerHTML = `
        <header>
            <nav>
                <a href="" id="home">Home</a>
                <a href="" id="list">List</a>
                <a href="" id="watchlist">Watchlist</a>
                <a href="" id="settings">Settings</a>
            </nav>
        </header>
        <main></main>
    `;
        const searchMovieSpy = jest
            .spyOn(searchMovieModule, "searchMovie")
            .mockImplementationOnce(async () =>
                document.createDocumentFragment()
            );

        const overlay = createModal();
        renderWatchList();
        const addButton = document.querySelector("button");
        document.body.append(overlay);
        const spinnerElement = document.querySelector(".spinner");
        addButton!.click();

        const inputElement = document.querySelector("input");
        inputElement!.value = "hello";
        const searchButton = document.querySelector(".searchButton");
        if (searchButton instanceof HTMLElement) searchButton?.click();
        expect(searchMovieSpy).toHaveBeenCalled();

        expect(spinnerElement?.classList).not.toContain("hidden");

        const warningElement = document.querySelector(".warning");

        inputElement!.value = "inception";
        searchMovieSpy.mockImplementationOnce(() => Promise.reject("hello"));
        if (searchButton instanceof HTMLElement) searchButton?.click();
        await flushPromises();
        expect(warningElement?.textContent).toBe("No results found");

        inputElement!.value = "he";
        if (searchButton instanceof HTMLElement) searchButton?.click();

        expect(warningElement?.textContent).toBe(
            "Type at least three characters"
        );
    });
});
