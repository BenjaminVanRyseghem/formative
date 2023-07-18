module.exports = {
	extends: ["plugin:prettier/recommended", "plugin:import/recommended"],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2022
	},
	plugins: ["sort-imports-es6-autofix", "jsdoc"],
	env: {
		es2021: true
	},
	rules: {
		"consistent-default-export-name/default-export-match-filename": "error",
		"logical-assignment-operators": ["error", "always", { enforceForIfStatements: true }],
		"no-lonely-if": "error",
		"no-else-return": "error",
		"no-alert": "error",
		"new-cap": [
			"error",
			{
				newIsCapExceptionPattern: "ruleModelClass|testedClass|templateClass|rowClass"
			}
		],
		"no-unsafe-negation": "error",
		"no-invalid-regexp": "error",
		"prefer-object-spread": "error",
		"prefer-arrow-callback": "error",
		"prefer-regex-literals": ["error", { disallowRedundantWrapping: true }],
		"max-params": "error",
		"no-shadow": ["error", { allow: ["html", "css"] }],
		"no-new-native-nonconstructor": "error",
		"no-restricted-syntax": [
			"error",
			{
				selector: "MemberExpression[object.name=css][property.name=debug]",
				message: "`css.debug` is for debug only."
			}
		],
		"no-unused-vars": [
			"error",
			{
				vars: "local",
				args: "after-used",
				argsIgnorePattern: "^_",
				destructuredArrayIgnorePattern: "^_",
				caughtErrors: "all"
			}
		],
		"no-var": "error",
		"no-func-assign": "error",
		"no-class-assign": "error",
		"func-style": "off",
		"no-console": "error",
		"ftgp/indent": "off",
		"lines-between-class-members": ["error", "always"],
		"arrow-body-style": "error",
		"object-shorthand": ["error", "properties"],
		"no-sequences": ["error", { allowInParentheses: false }],
		"prefer-template": "error",
		"no-useless-concat": "error",
		"no-await-in-loop": "error",
		"no-return-await": "error",
		"prefer-promise-reject-errors": "error",
		"require-await": "error",
		quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: false }],
		"sort-imports-es6-autofix/sort-imports-es6": [
			"error",
			{
				ignoreCase: true
			}
		],
		"no-restricted-imports": [
			"error",
			{
				paths: [
					{
						name: "lit",
						importNames: ["css"],
						message: "Please use `canvas/CSSCanvas.js` instead."
					},
					{
						name: "prop-types",
						message: "Please use `helpers/types.js` instead."
					},
					{
						name: "atomico",
						importNames: ["css"],
						message: "Please use `canvas/CSSCanvas.js` instead."
					}
				]
			}
		],
		"spaced-comment": [
			"error",
			"always",
			{
				block: {
					balanced: true
				}
			}
		],
		"padding-line-between-statements": [
			"error",
			{
				blankLine: "always",
				prev: "*",
				next: "export"
			},
			{ blankLine: "always", prev: "multiline-expression", next: "*" },
			{
				blankLine: "always",
				prev: "*",
				next: "multiline-expression"
			},
			{ blankLine: "always", prev: "function", next: "function" },
			{
				blankLine: "always",
				prev: "import",
				next: "*"
			},
			{
				blankLine: "never",
				prev: "import",
				next: "import"
			}
		],
		"sort-class-members/sort-class-members": [
			2,
			{
				order: ["constructor", "[non-static-methods]", "[static-public-methods]", "[static-protected-methods]"],
				groups: {
					"non-static-methods": [{ static: false, type: "method" }],
					"static-public-methods": [{ name: "/^[^_].+/", static: true, type: "method" }],
					"static-protected-methods": [{ name: "/^_.+/", static: true, type: "method" }]
				}
			}
		],
		"@shopify/prefer-early-return": ["error", { maximumStatements: 0 }],
		"sonarjs/prefer-immediate-return": "error",
		"jsdoc/check-alignment": "error",
		"jsdoc/check-examples": "off",
		"jsdoc/check-indentation": "off",
		"jsdoc/check-param-names": "off",
		"jsdoc/check-syntax": "error",
		"jsdoc/check-tag-names": "error",
		"jsdoc/check-types": "error",
		"jsdoc/implements-on-classes": "error",
		"jsdoc/match-description": "off",
		"jsdoc/newline-after-description": "off",
		"jsdoc/no-types": "off",
		"jsdoc/no-undefined-types": "off",
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
					FunctionDeclaration: false,
					MethodDefinition: false
				}
			}
		],
		"jsdoc/require-param": "off",
		"jsdoc/require-param-description": "error",
		"jsdoc/require-param-name": "error",
		"jsdoc/require-param-type": "error",
		"jsdoc/require-returns": "off",
		"jsdoc/require-returns-check": "error",
		"jsdoc/require-returns-description": "off",
		"jsdoc/require-returns-type": "error",
		"jsdoc/valid-types": "error",
		"eslint-comments/no-use": [
			"error",
			{
				allow: ["eslint-disable-next-line", "eslint-disable-line", "eslint"]
			}
		],
		"promise/catch-or-return": "off", // We very rarely catch errors:
		"promise/no-promise-in-callback": "off", // We use too many callbacks for now
		"promise/no-callback-in-promise": "off", // We use too many callbacks for now
		"promise/always-return": "off", // Report too many problems for now
		"promise/no-nesting": "error", // Default is "warning"
		"promise/valid-params": "error", // Default is "warning"
		"unicorn/custom-error-definition": "error", // Implies a lot of changes and is not fixable:
		"unicorn/consistent-function-scoping": "off", // We don't want to use these rules:
		"unicorn/explicit-length-check": "off", // Incompatible with prettier:
		"unicorn/number-literal-case": "off", // We should slowly activate the rules below:
		"unicorn/filename-case": "off",
		"unicorn/import-style": "off",
		"unicorn/no-array-callback-reference": "off",
		"unicorn/no-array-for-each": "off",
		"unicorn/no-array-method-this-argument": "off",
		"unicorn/no-array-reduce": "off",
		"unicorn/no-console-spaces": "off",
		"unicorn/no-document-cookie": "off",
		"unicorn/no-empty-file": "off",
		"unicorn/no-hex-escape": "off",
		"unicorn/no-instanceof-array": "off",
		"unicorn/no-invalid-remove-event-listener": "off",
		"unicorn/no-nested-ternary": "off",
		"unicorn/no-new-array": "off",
		"unicorn/no-new-buffer": "off",
		"unicorn/no-null": "off",
		"unicorn/no-object-as-default-parameter": "off",
		"unicorn/no-process-exit": "off",
		"unicorn/no-static-only-class": "off",
		"unicorn/no-thenable": "off",
		"unicorn/no-this-assignment": "off",
		"unicorn/no-unreadable-array-destructuring": "off",
		"unicorn/no-useless-fallback-in-spread": "off",
		"unicorn/no-useless-length-check": "off",
		"unicorn/no-useless-promise-resolve-reject": "off",
		"unicorn/no-useless-spread": "off",
		"unicorn/no-useless-undefined": "off",
		"unicorn/no-zero-fractions": "off",
		"unicorn/prefer-add-event-listener": "off",
		"unicorn/prefer-array-find": "off",
		"unicorn/prefer-array-flat": "off",
		"unicorn/prefer-array-flat-map": "off",
		"unicorn/prefer-array-index-of": "off",
		"unicorn/prefer-array-some": "off",
		"unicorn/prefer-code-point": "off",
		"unicorn/prefer-date-now": "off",
		"unicorn/prefer-default-parameters": "off",
		"unicorn/prefer-dom-node-append": "off",
		"unicorn/prefer-dom-node-dataset": "off",
		"unicorn/prefer-dom-node-remove": "off",
		"unicorn/prefer-dom-node-text-content": "off",
		"unicorn/prefer-export-from": "off",
		"unicorn/prefer-includes": "off",
		"unicorn/prefer-json-parse-buffer": "off",
		"unicorn/prefer-keyboard-event-key": "off",
		"unicorn/prefer-math-trunc": "off",
		"unicorn/prefer-modern-dom-apis": "off",
		"unicorn/prefer-module": "off",
		"unicorn/prefer-negative-index": "off",
		"unicorn/prefer-number-properties": "off",
		"unicorn/prefer-object-from-entries": "off",
		"unicorn/prefer-prototype-methods": "off",
		"unicorn/prefer-query-selector": "off",
		"unicorn/prefer-reflect-apply": "off",
		"unicorn/prefer-regexp-test": "off",
		"unicorn/prefer-set-has": "off",
		"unicorn/prefer-spread": "off",
		"unicorn/prefer-string-slice": "off",
		"unicorn/prefer-string-starts-ends-with": "off",
		"unicorn/prefer-string-trim-start-end": "off",
		"unicorn/prefer-switch": "off",
		"unicorn/prefer-ternary": "off",
		"unicorn/prefer-type-error": "off",
		"unicorn/prevent-abbreviations": "off",
		"unicorn/relative-url-style": "off",
		"unicorn/require-array-join-separator": "off",
		"unicorn/require-number-to-fixed-digits-argument": "off",
		"unicorn/template-indent": "off",
		"unicorn/text-encoding-identifier-case": "off",
		"unicorn/throw-new-error": "off"
	},
	ignorePatterns: ["build/**", "storybook-static/**", "!.storybook", "node_modules/**"],
	settings: {
		"import/extensions": [".js", ".mjs", ".cjs"],
		jsdoc: {
			mode: "jsdoc",
			avoidExampleOnConstructors: true,
			tagNamePreference: {
				returns: "return"
			},
			preferredTypes: {
				Function: "function"
			}
		}
	},
	overrides: [
		{
			files: ["*.stories.js"],
			rules: {
				"no-alert": "off",
				"storybook/prefer-pascal-case": "error", // default is warning
				// the generated titles aren't good enough for now:
				"storybook/no-title-property-in-meta": "off"
			}
		},
		{
			files: [".storybook/**/*.js"],
			rules: {
				"import/no-unused-modules": "off"
			}
		}
	]
};
