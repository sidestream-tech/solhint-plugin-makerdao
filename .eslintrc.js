module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        es2018: true,
        jest: true,
    },
    extends: [
        "airbnb-base",
        "airbnb-typescript/base"
    ],
    plugins: ['prettier', '@typescript-eslint'],
    extends: ['plugin:prettier/recommended'],
    globals: {
        process: 'readonly',
    },
    rules: {
        'prettier/prettier': 'warn',
        'prefer-const': ['warn'],
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
        curly: 'warn',
        'no-undef': 'off',
        'eol-last': ['error', 'always'],
        'max-len': ['error', { 'code': 120 }],
        'no-return-await': [
            'error'
        ],
        'import/prefer-default-export': 'off',
    },
    ignorePatterns: ['rules/**/*.js', 'test/**/*.js', 'index.js', 'bin/**', '.eslintrc.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: "./tsconfig.json"
    },

};
