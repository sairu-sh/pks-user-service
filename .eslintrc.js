module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/indent': ['error', 4, { ignoredNodes: ['PropertyDefinition'] }],
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
        'import/no-extraneous-dependencies': 'off',
        'no-shadow': 'off',
        'no-empty-function': [
            'error',
            {
                allow: ['constructors'],
            },
        ],
        'no-useless-constructor': 'off',
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
        },
    },
};
