const config = {
    "*.{js,jsx,ts,tsx}": [
        "biome format --write --no-errors-on-unmatched",
        "biome check --write --unsafe --no-errors-on-unmatched",
        () => "yarn lint:types",
        () => "yarn lint:steiger",
    ],
    "*.{css,scss}": [
        "biome format --write --no-errors-on-unmatched",
        "biome check --write --unsafe --no-errors-on-unmatched",
    ],
    "*.{json,md}": ["biome format --write --no-errors-on-unmatched"],
};

export default config;
