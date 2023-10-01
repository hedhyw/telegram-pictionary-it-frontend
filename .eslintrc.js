module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'react-app',
        'react-app/jest',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                '.eslintrc.{js,cjs}',
            ],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4, { 'SwitchCase': 1 }],
        quotes: ['error', 'single'],
        semi: [2, 'always'],
        'comma-dangle': ['error', 'always-multiline'],
    },
};
