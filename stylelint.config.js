'use strict';

module.exports = {
    'extends': 'stylelint-config-concentric',

    'plugins': [
        'stylelint-scss',
        'stylelint-declaration-use-variable'
    ],

    'rules': {
        'sh-waqar/declaration-use-variable': 'color',

        'scss/at-import-partial-extension-whitelist': [''],
        'scss/at-import-no-partial-leading-underscore': true,
        'scss/at-extend-no-missing-placeholder': true,
        'scss/dollar-variable-colon-space-after': 'always',
        'scss/dollar-variable-colon-space-before': 'never',

        'color-hex-case': 'lower',
        'color-hex-length': 'long',
        'color-named': 'never',
        'color-no-invalid-hex': true,

        'font-family-name-quotes': 'always-unless-keyword',
        'font-family-no-duplicate-names': true,

        'function-calc-no-unspaced-operator': true,
        'function-comma-space-after': 'always',
        'function-comma-space-before': 'never',
        'function-linear-gradient-no-nonstandard-direction': true,
        'function-name-case': 'lower',
        'function-parentheses-space-inside': 'never',
        'function-url-quotes': 'always',

        'number-no-trailing-zeros': true,

        'string-no-newline': true,
        'string-quotes': 'single',

        'length-zero-no-unit': true,

        'time-no-imperceptible': true,

        'unit-case': 'lower',
        'unit-no-unknown': true,

        'value-keyword-case': 'lower',
        'value-no-vendor-prefix': true,
        'value-list-comma-space-after': 'always',
        'value-list-comma-space-before': 'never',
        'value-list-max-empty-lines': 0,

        'shorthand-property-no-redundant-values': true,

        'property-case': 'lower',
        'property-no-unknown': true,
        'property-no-vendor-prefix': true,

        'declaration-bang-space-after': 'never',
        'declaration-bang-space-before': 'always',
        'declaration-colon-space-after': 'always',
        'declaration-colon-space-before': 'never',

        'declaration-block-no-duplicate-properties': true,
        'declaration-block-no-ignored-properties': true,
        'declaration-block-no-redundant-longhand-properties': true,
        'declaration-block-no-shorthand-property-overrides': true,
        'declaration-block-semicolon-newline-after': 'always',
        'declaration-block-semicolon-space-after': 'always-single-line',
        'declaration-block-single-line-max-declarations': 1,
        'declaration-block-trailing-semicolon': 'always',


        'block-closing-brace-empty-line-before': 'never',
        'block-closing-brace-newline-after': 'always',
        'block-closing-brace-newline-before': 'always',
        'block-closing-brace-space-before': 'always-single-line',
        'block-no-single-line': true,
        'block-opening-brace-newline-after': 'always-multi-line',
        'block-opening-brace-space-after': 'always-single-line',
        'block-opening-brace-space-before': 'always-single-line',

        'selector-attribute-brackets-space-inside': 'always',
        'selector-attribute-operator-space-after': 'always',
        'selector-attribute-operator-space-before': 'always',
        'selector-attribute-quotes': 'always',
        'selector-class-pattern': '[_a-z0-9]+',
        'selector-combinator-space-after': 'always',
        'selector-combinator-space-before': 'always',
        'selector-descendant-combinator-no-non-space': true,
        'selector-id-pattern': '[_a-z0-9]+',
        'selector-max-compound-selectors': 4,
        'selector-no-qualifying-type': [ true, {
              'ignore': ['attribute']
            }
        ],
        'selector-no-universal': true,
        'selector-no-vendor-prefix': true,
        'selector-pseudo-class-case': 'lower',
        'selector-pseudo-class-no-unknown': true,
        'selector-pseudo-class-parentheses-space-inside': 'always',
        'selector-pseudo-element-case': 'lower',
        'selector-pseudo-element-colon-notation': 'double',
        'selector-pseudo-element-no-unknown': true,
        'selector-type-case': 'lower',
        'selector-type-no-unknown': true,

        'selector-list-comma-newline-after': 'always',

        'media-feature-colon-space-after': 'always',
        'media-feature-colon-space-before': 'never',
        'media-feature-name-case': 'lower',
        'media-feature-name-no-unknown': true,
        'media-feature-no-missing-punctuation': true,
        'media-feature-parentheses-space-inside': 'always',
        'media-feature-range-operator-space-after': 'always',
        'media-feature-range-operator-space-before': 'always',

        'at-rule-name-case': 'lower',
        'at-rule-name-space-after': 'always',
        'at-rule-no-unknown': [ true, {
                'ignoreAtRules': ['include'] 
            }
        ],
        'at-rule-semicolon-newline-after': 'always',

        'comment-no-empty': true,
        'comment-whitespace-inside': 'always',

        'indentation': [ 4, {
                'ignore': ['value']
            }
        ],
        'max-nesting-depth': 4,
        'no-descending-specificity': true,
        'no-duplicate-selectors': true,
        'no-eol-whitespace': true,
        'no-extra-semicolons': true,
        'no-indistinguishable-colors': true,
        'no-invalid-double-slash-comments': true,
        'no-unknown-animations': true
    }
};
