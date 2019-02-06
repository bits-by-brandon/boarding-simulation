module.exports = {
    "collectCoverage": true,
    "collectCoverageFrom": [
        "./src/**/*.{js,jsx,ts}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ],
    "coverageDirectory": "coverage",
    "coverageReporters": ["json"],
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
};