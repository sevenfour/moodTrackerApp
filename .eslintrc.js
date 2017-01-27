module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    extends: [
        'eslint:recommended',
        'plugin:ember-suave/recommended'
    ],
    env: {
        browser: true
    },
    rules: {
        'indent': 'off',
        'one-var': ["error", { var: "always", let: "never", const: "never" }],
        'array-bracket-spacing': [
            'error', 'always', {
                'singleValue': false, 'objectsInArrays': false, 'arraysInArrays': false
            }
        ],
        'ember-suave/prefer-destructuring': 'off',
        'ember-suave/no-const-outside-module-scope': 'off'
    }
};
