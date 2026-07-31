/** @type {import("jest").Config} **/
export default {
    testEnvironment: "jsdom",
    preset: "ts-jest",
    testPathIgnorePatterns: [`<rootDir>/dist/`],

    moduleNameMapper: {
        "^@pages/(.*)": "<rootDir>/src/pages/$1",
        "^@utils/(.*)": "<rootDir>/src/utils/$1",
    },
};
