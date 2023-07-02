/* eslint-disable max-lines */
// eslint-disable-next-line filenames/match-regex
module.exports = {
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jasmine: true,
    jest: true,
    jquery: true
  },
  plugins: [
    "ftgp",
    "jasmine",
    "filenames",
    "jsdoc",
    "sort-imports-es6-autofix"
  ],
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jasmine/recommended",
    "prettier"
  ],
  settings: {
    jsdoc: {
      avoidExampleOnConstructors: true,
      tagNamePreference: {
        returns: "return"
      }
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"]
      }
    }
  },
  rules: {
    // http://eslint.org/docs/rules
    /**
     * Possible Errors
     */

    "for-direction": "error",
    "getter-return": "error",
    "no-await-in-loop": "error",
    "no-compare-neg-zero": "error",
    "no-cond-assign": ["error", "always"],
    "no-console": "error",
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-dupe-args": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-empty-character-class": "error",
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-parens": [
      "error",
      "all",
      {
        nestedBinaryExpressions: false,
        ignoreJSX: "multi-line",
        enforceForArrowConditionals: false,
        returnAssign: false
      }
    ],
    "no-extra-semi": "error",
    "no-func-assign": "error",
    "no-inner-declarations": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-obj-calls": "error",
    "no-prototype-builtins": "error",
    "no-regex-spaces": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
    "no-unsafe-finally": "error",
    "no-unsafe-negation": "error",
    "use-isnan": "error",
    "valid-jsdoc": "off",
    "valid-typeof": "error",

    /**
     * Best Practices
     */

    "accessor-pairs": "error",
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "class-methods-use-this": "off",
    complexity: "error",
    "consistent-return": "error",
    curly: ["error", "multi-line"],
    "default-case": "error",
    "dot-location": "off",
    "dot-notation": [
      "error",
      {
        allowKeywords: true
      }
    ],
    eqeqeq: "error",
    "guard-for-in": "error",
    "no-alert": "error",
    "no-caller": "error",
    "no-case-declarations": "error",
    "no-div-regex": "error",
    "no-else-return": "error",
    "no-empty-function": "off",
    "no-empty-pattern": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-fallthrough": "error",
    "no-floating-decimal": "error",
    "no-global-assign": "error",
    "no-implicit-coercion": "off",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-invalid-this": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-magic-numbers": "off",
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-redeclare": "error",
    "no-restricted-properties": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-script-url": "error",
    "no-self-assign": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-escape": "error",
    "no-useless-return": "error",
    "no-void": "error",
    "no-warning-comments": "off",
    "no-with": "error",
    "prefer-promise-reject-errors": "error",
    radix: "error",
    "require-await": "error",
    "vars-on-top": "error",
    "wrap-iife": ["error", "any"],
    yoda: "error",

    /**
     * Strict mode
     */

    strict: ["error", "never"],

    /**
     * Variables
     */

    "init-declarations": "error",
    "no-catch-shadow": "error",
    "no-delete-var": "error",
    "no-label-var": "error",
    "no-restricted-globals": "error",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-undef": "error",
    "no-undef-init": "error",
    "no-undefined": "off",
    "no-unused-vars": [
      "error",
      {
        vars: "local",
        args: "after-used",
        varsIgnorePattern: "^_"
      }
    ],
    "no-use-before-define": ["error", "nofunc"],

    /**
     * Node.js and CommonJS
     */

    "callback-return": "error",
    "global-require": "error",
    "handle-callback-err": "error",
    "no-buffer-constructor": "error",
    "no-mixed-requires": "error",
    "no-new-require": "error",
    "no-path-concat": "error",
    "no-process-env": "error",
    "no-process-exit": "error",
    "no-restricted-modules": "error",
    "no-sync": "error",

    /**
     * Stylistic Issues
     */

    "array-bracket-newline": "error",
    "array-bracket-spacing": "error",
    "array-element-newline": "off",
    "block-spacing": "error",
    "brace-style": [
      "error",
      "1tbs",
      {
        allowSingleLine: true
      }
    ],
    camelcase: [
      "error",
      {
        properties: "always"
      }
    ],
    "capitalized-comments": "off",
    "comma-dangle": ["error", "never"],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true
      }
    ],
    "comma-style": ["error", "last"],
    "computed-property-spacing": "error",
    "consistent-this": "off",
    "eol-last": "error",
    "func-call-spacing": "error",
    "func-name-matching": "error",
    "func-names": ["error", "as-needed"],
    "func-style": [
      "error",
      "declaration",
      {
        allowArrowFunctions: true
      }
    ],
    // "function-paren-newline": "error",
    "id-blacklist": "error",
    "id-length": [
      "error",
      {
        exceptions: [
          "x",
          "y",
          "i",
          "j",
          "t"

          // specific to i18n
        ]
      }
    ],
    "id-match": "error",
    "implicit-arrow-linebreak": ["error", "beside"],
    "jsx-quotes": "error",
    "key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    "keyword-spacing": "error",
    "line-comment-position": "off",
    "linebreak-style": "error",
    "lines-around-comment": [
      "error",
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true
      }
    ],
    "lines-between-class-members": ["error", "always"],
    "max-depth": "error",
    "max-len": [
      "error",
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    "max-lines": "error",
    "max-nested-callbacks": "error",
    "max-params": "error",
    "max-statements": [
      "error",
      {
        max: 16
      }
    ],
    "max-statements-per-line": [
      "error",
      {
        max: 2
      }
    ],
    "multiline-comment-style": ["error", "starred-block"],
    "multiline-ternary": ["error", "always-multiline"],
    "new-cap": [
      "error",
      {
        newIsCap: true
      }
    ],
    "new-parens": "error",
    // "newline-per-chained-call": "error",
    "no-array-constructor": "error",
    "no-bitwise": "error",
    "no-continue": "error",
    "no-inline-comments": "off",
    "no-lonely-if": "error",
    "no-mixed-operators": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-multi-assign": "error",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1
      }
    ],
    "no-negated-condition": "error",
    "no-nested-ternary": "error",
    "no-new-object": "error",
    "no-plusplus": "off",
    "no-restricted-syntax": "error",
    "no-tabs": "off",
    "no-ternary": "off",
    "no-trailing-spaces": "error",
    "no-underscore-dangle": [
      "error",
      {
        allowAfterThis: true
      }
    ],
    "no-unneeded-ternary": "error",
    "no-whitespace-before-property": "error",
    "nonblock-statement-body-position": "error",
    "object-curly-newline": [
      "error",
      {
        multiline: true,
        consistent: true
      }
    ],
    "object-curly-spacing": ["error", "always"],
    // "object-property-newline": "error",
    "one-var": ["error", "never"],
    "one-var-declaration-per-line": "error",
    "operator-assignment": "error",
    "operator-linebreak": "error",
    "padded-blocks": ["error", "never"],
    "padding-line-between-statements": "error",
    "quote-props": ["error", "as-needed"],
    quotes: ["error", "double"],
    "require-jsdoc": "off",
    semi: ["error", "always"],
    "semi-spacing": [
      "error",
      {
        before: false,
        after: true
      }
    ],
    "semi-style": "error",
    "sort-keys": "off",
    "sort-vars": "error",
    "space-before-blocks": "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always"
      }
    ],
    "space-in-parens": "error",
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": ["error", "always"],
    "switch-colon-spacing": "error",
    "template-tag-spacing": "error",
    "unicode-bom": "error",
    "wrap-regex": "error",

    /**
     * ECMAScript 6
     */

    "arrow-body-style": ["error", "as-needed"],
    "arrow-parens": ["error", "always"],
    "arrow-spacing": "error",
    "constructor-super": "error",
    "generator-star-spacing": ["error", "after"],
    "no-class-assign": "error",
    "no-confusing-arrow": [
      "error",
      {
        allowParens: true
      }
    ],
    "no-const-assign": "error",
    "no-dupe-class-members": "error",
    "no-duplicate-imports": "error",
    "no-new-symbol": "error",
    "no-restricted-imports": "off",
    "no-this-before-super": "error",
    "no-useless-computed-key": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "off",
    "prefer-destructuring": [
      "error",
      {
        VariableDeclarator: {
          array: true,
          object: true
        },
        AssignmentExpression: {
          array: false,
          object: false
        }
      }
    ],
    "prefer-numeric-literals": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "require-yield": "error",
    "rest-spread-spacing": ["error", "never"],
    "sort-imports-es6-autofix/sort-imports-es6": [
      "error",
      {
        ignoreCase: true
      }
    ],
    "symbol-description": "error",
    "template-curly-spacing": ["error", "never"],
    "yield-star-spacing": ["error", "after"],

    /**
     * Jasmine
     */

    "jasmine/no-suite-dupes": "error",
    "jasmine/no-spec-dupes": "error",
    "jasmine/valid-expect": "error",
    "jasmine/no-unsafe-spy": "off",
    "jasmine/prefer-toHaveBeenCalledWith": "off",

    /**
     * Better indent
     */

    /**
     * Filenames
     */

    "filenames/match-regex": [
      "error",
      "^([a-z0-9]+)([A-Z][a-z0-9]+)*(-test|\\.test|\\.stories)?$"
    ],
    "filenames/match-exported": ["error", "camel"],

    /**
     * JSDOC
     */
    "jsdoc/check-alignment": "error",
    "jsdoc/check-examples": "error",
    "jsdoc/check-indentation": "error",
    "jsdoc/check-param-names": "error",
    "jsdoc/check-syntax": "error",
    "jsdoc/check-tag-names": "error",
    "jsdoc/check-types": "error",
    "jsdoc/implements-on-classes": "error",
    "jsdoc/match-description": "error",
    "jsdoc/newline-after-description": "error",
    "jsdoc/no-types": "off",
    "jsdoc/no-undefined-types": "error",
    "jsdoc/require-description": "off",
    "jsdoc/require-description-complete-sentence": "off",
    "jsdoc/require-example": "off",
    "jsdoc/require-hyphen-before-param-description": "error",
    "jsdoc/require-jsdoc": [
      "error",
      {
        require: {
          ArrowFunctionExpression: false,
          ClassDeclaration: true,
          FunctionExpression: false,
          MethodDefinition: false
        }
      }
    ],
    "jsdoc/require-param": "error",
    "jsdoc/require-param-description": "error",
    "jsdoc/require-param-name": "error",
    "jsdoc/require-param-type": "error",
    "jsdoc/require-returns": "error",
    "jsdoc/require-returns-check": "error",
    "jsdoc/require-returns-description": "off",
    "jsdoc/require-returns-type": "error",
    "jsdoc/valid-types": "error"
  }
};
