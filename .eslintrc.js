module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'import'],
    globals: {
        process: true,
    },
    rules: {
        'prettier/prettier': ['warn', { endOfLine: 'auto' }],
        'react/prop-types': ['off'],
        'import/no-duplicates': ['warn'],
    },
};
