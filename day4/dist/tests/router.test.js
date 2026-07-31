import { navigate } from "../utils/util";
import { register } from "../utils/util";
import { renderHomePage } from "../pages/home";
import { renderListPage } from "../pages/list";
import { addAnchorEventListeners } from "../main";
const fetch = require("cross-fetch");
global.fetch = fetch;
describe("Router tests:", () => {
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
    let path = "home";
    let routes = {};
    let a = 10;
    test("register test", () => {
        let fn = () => {
            a = 20;
        };
        register(routes, path, fn);
        expect(routes[path]).toBe(fn);
    });
    test("testing navigate function", () => {
        navigate(routes, path, {});
        expect(a).toBe(20);
    });
    test("navigation", async () => {
        let path1 = "/home";
        let routes1 = {};
        register(routes1, path1, renderHomePage);
        await navigate(routes1, path1, {});
        const homeElement = document.querySelector(".home");
        expect(homeElement).not.toBe(null);
        path1 = "/list";
        register(routes1, path1, renderListPage);
        await navigate(routes1, path1, {});
        const listElement = document.querySelector(".list");
        expect(listElement).not.toBe(null);
    });
    test("url change", async () => {
        const links = document.querySelectorAll("a");
        addAnchorEventListeners();
        links[1].click();
        expect(document.location.pathname).toBe("/day5/index.html/list");
        links[0].click();
        expect(document.location.pathname).toBe("/day5/index.html/home");
        links[2].click();
        expect(document.location.pathname).toBe("/day5/index.html/watchlist");
        links[3].click();
        expect(document.location.pathname).toBe("/day5/index.html/settings");
        await new Promise((resolve) => setTimeout(resolve, 3000));
    });
});
