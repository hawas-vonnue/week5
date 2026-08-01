# MOVIE LIBRARY

## Features

- Movie library has 5 pages - Home page, List page, Watchlist page, Settings page and Details page.
- Home page has Top 3 movie cards
- List page lists top 100 movie cards
- Watchlist page is to add movies to your watchlist. Movies can be find through search and added to watchlist.
- Added Movies in watchlist are persisted through local storage.
- Settings page is just some settings (Which currently has no impact)

## Live Demo

- To see the live website [go to to the link.](https://movie-library-day5.netlify.app/day5/index.html/home)

## Tech stack

- HTML, CSS and TypeScript are used.
- Jest is used for testing.

## TypeScript features used

- Type checking
- Path aliasing

## Folder structure

```
day4(project root)/
├── dist/
│   ├── pages/
|   |     ├── details.d.ts
|   |     ├── detail.js
|   |     ├── home.d.ts
|   |     ├── home.js
|   |     ├── list.d.ts
│   │     ├── list.js
|   |     ├── settings.d.ts
|   |     ├── settings.js
|   |     ├── watchlist.d.ts
|   |     └── watchlist.js
|   ├── tests/
|   |      ├── apiClient.test.d.ts
|   |      ├── apiClient.test.js
|   |      ├── fetchJson.test.d.ts
|   |      ├── fetchJson.test.js
|   |      ├── pages.test.d.ts
|   |      ├── pages.test.js
|   |      ├── queue.test.d.ts
|   |      ├── queue.test.js
|   |      ├── router.test.d.ts
|   |      ├── router.test.js
|   |      ├── showToast.test.d.ts
|   |      ├── showToast.test.js
|   |      ├── stateManager.test.d.ts
|   |      ├── stateManager.test.js
|   |      ├── utils.test.d.ts
|   |      └── utils.test.js
|   ├── utils/
|   |      ├── apiClient.d.ts
|   |      |── apiClient.js
|   |      ├── queue.d.ts
|   |      |── queue.js
|   |      ├── searchMovie.d.ts
|   |      ├── searchMovie.js
|   |      ├── showToast.d.ts
|   |      ├── showToast.js
|   |      ├── util.d.ts
|   |      └── util.js
|   ├── main.d.ts
│   ├── main.js
|   ├── types.d.ts
│   ├── types.js
|   ├── index.html
|   ├── main.css
|   └── Top_100_Movies.csv
├── src/
│   ├── pages/
│   │     ├── detail.ts
|   |     ├── home.ts
|   |     ├── list.ts
|   |     ├── settings.ts
|   |     └── watchlist.ts
|   ├── tests/
|   |      ├── apiClient.tests.ts
|   |      ├── fetchJson.test.ts
|   |      ├── pages.test.ts
|   |      ├── queue.test.ts
|   |      ├── router.test.ts
|   |      ├── showToast.test.ts
|   |      ├── stateManager.test.ts
|   |      └── utils.test.ts
|   ├── utils/
|   |      ├── apiClient.ts
|   |      ├── queue.ts
|   |      ├── searchMovie.ts
|   |      ├── showToast.ts
|   |      └── util.ts
│   ├── main.ts
│   ├── types.ts
|   ├── index.html
|   ├── main.css
|   └── Top_100_Movies.csv
├── package-lock.json
├── tsconfig.json
├── jest.config.js
├── package.json
└── README.md
```

## To run the project

### Prerequisites to run the project

- live-server (can be installed using npm - `npm install live-server`)

### How to run

- Clone the repo using `git clone `
- Change to dist directory `cd dist`
- run live-server `live-server --entry-file=index.html`
- Now the website is live on localhost

## To test the project

### Prerequisites for test

- Install jest

### To Test

- run `npx jest`
