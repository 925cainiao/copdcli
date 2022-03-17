module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'spaced-comment': 0,
        'no-mixed-spaces-and-tabs': 0,
        'no-multiple-empty-lines': 0,
        'no-console': 0
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    overrides: [{
        files: [
            '**/__tests__/*.{j,t}s?(x)'
        ],
        env: {
            mocha: true
        }
    }]
}