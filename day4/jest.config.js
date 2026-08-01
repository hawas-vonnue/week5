/** @type {import("jest").Config} **/
export default {
    testEnvironment: "jsdom",
    preset: "ts-jest",
    testPathIgnorePatterns: [`<rootDir>/dist/`],

    moduleNameMapper: {
        "^@pages/(.*)\\.js$": "<rootDir>/src/pages/$1",
        "^@pages/(.*)$": "<rootDir>/src/pages/$1",
        "^@utils/(.*)\\.js$": "<rootDir>/src/utils/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        //to strip .js extension
        "(.+)\\.js": "$1",
    },
};
