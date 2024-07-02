module.exports = {
    env: {
        node: true,
        commonjs: true,
    },
    extends: [
        'standard',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-console': ['error'],
        'comma-dangle': [2, 'always-multiline'],
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'no-unused-vars': 'error',
    },
}
