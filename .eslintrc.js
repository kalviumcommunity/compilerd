module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
    },
    extends: [
        'eslint:recommended',
        'plugin:node/recommended',
    ],
    rules: {
        // Additional rules specific to your project
        'no-console': 'off', // Allowing console statements for debugging purposes
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }], // Allowing ES6 import/export syntax
        'node/no-missing-import': 'off', // Allowing unresolved imports (may be handled at runtime)
    },
    overrides: [
        {
            files: ['*/.js'], // Target JavaScript files
            rules: {
                // Additional rules for JavaScript files
            },
        },
        {
            files: ['*/.jsx'], // Target JSX files if applicable
            rules: {
                // Additional rules for JSX files
            },
        },
        {
            files: ['*/.ts', '*/.tsx'], // Target TypeScript files if applicable
            parser: '@typescript-eslint/parser',
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            plugins: ['@typescript-eslint'],
            rules: {
                // Additional TypeScript-specific rules
            },
        },
    ],
    settings: {
        node: {
            tryExtensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.node'],
        },
    },
};
