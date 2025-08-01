import globals from 'globals'
import js from '@eslint/js'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
	{ ignores: ['dist'] },

	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			...jsxA11y.flatConfigs.recommended.languageOptions,
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		settings: { react: { version: '18.3' } },
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			...reactHooks.configs.recommended.rules,
			...jsxA11y.flatConfigs.recommended.rules,
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'react/jsx-no-target-blank': [
				'warn',
				{ enforceDynamicLinks: 'always', warnOnSpreadAttributes: true, forms: true },
			],
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'react/boolean-prop-naming': ['error', { validateNested: true }],
			'react/button-has-type': 'warn',
			'react/checked-requires-onchange-or-readonly': [
				'warn',
				{
					ignoreMissingProperties: true,
					ignoreExclusiveCheckedAttribute: false,
				},
			],
			'react/destructuring-assignment': [
				'warn',
				'always',
				{ ignoreClassFields: false, destructureInSignature: 'always' },
			],
			'react/display-name': ['warn', { ignoreTranspilerName: false }],
			'react/forbid-dom-props': ['warn', { forbid: ['style', 'align', 'bgcolor', 'border'] }],
			'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: false }],
			'react/forbid-prop-types': 'warn',
			'react/forward-ref-uses-ref': 'error',
			'react/jsx-boolean-value': 'warn',
			// 'react/jsx-child-element-spacing': 'warn',
			'react/jsx-closing-bracket-location': [
				'warn',
				{
					nonEmpty: 'tag-aligned',
					selfClosing: 'line-aligned',
				},
			],
			'react/jsx-closing-tag-location': 'warn',
			'react/jsx-curly-brace-presence': ['warn', 'never'],
			'react/jsx-curly-newline': ['warn', 'consistent'],
			'react/jsx-curly-spacing': [
				'warn',
				{
					when: 'never',
					allowMultiline: true,
					children: true,
					spacing: {
						objectLiterals: 'never',
					},
				},
			],
			'react/jsx-equals-spacing': ['warn', 'never'],
			'react/jsx-filename-extension': ['warn', { allow: 'as-needed', ignoreFilesWithoutCode: true }],
			'react/jsx-first-prop-new-line': ['warn', 'multiline-multiprop'],
			'react/jsx-fragments': ['warn', 'syntax'],
			'react/jsx-handler-names': [
				'warn',
				{
					checkLocalVariables: true,
				},
			],
			'react/jsx-indent': ['warn', 'tab'],
			'react/jsx-indent-props': ['warn', 'tab'],
			'react/jsx-key': [
				'warn',
				{ checkFragmentShorthand: true, checkKeyMustBeforeSpread: true, warnOnDuplicates: true },
			],
			'react/jsx-max-props-per-line': ['warn', { maximum: { single: 3, multi: 1 } }],
			'react/jsx-newline': [
				'warn',
				{
					prevent: true,
					allowMultilines: true,
				},
			],
			'react/jsx-no-constructed-context-values': 'warn',
			'react/jsx-no-script-url': [
				'error',
				[
					{
						name: 'Link',
						props: ['to'],
					},
				],
			],
			'react/jsx-no-useless-fragment': [
				'warn',
				{
					allowExpressions: true,
				},
			],
			'react/jsx-pascal-case': 'warn',
			'react/jsx-props-no-multi-spaces': 'warn',
			'react/jsx-props-no-spread-multi': 'warn',
			'react/jsx-sort-props': [
				'warn',
				{
					callbacksLast: true,
					shorthandLast: true,
					noSortAlphabetically: true,
				},
			],
			'react/jsx-tag-spacing': ['warn', { beforeSelfClosing: 'always', beforeClosing: 'never' }],
			'react/jsx-wrap-multilines': [
				'warn',
				{
					declaration: 'parens-new-line',
					assignment: 'parens-new-line',
					return: 'parens-new-line',
					arrow: 'parens-new-line',
					condition: 'parens-new-line',
				},
			],
			'react/no-access-state-in-setstate': 'error',
			'react/no-adjacent-inline-elements': 'warn',
			'react/no-arrow-function-lifecycle': 'error',
			'react/no-danger': [
				'error',
				{
					customComponentNames: ['*'],
				},
			],
			'react/no-did-mount-set-state': ['warn', 'disallow-in-func'],
			'react/no-did-update-set-state': ['warn', 'disallow-in-func'],
			'react/no-invalid-html-attribute': 'error',
			'react/no-multi-comp': ['warn', { ignoreStateless: true }],
			'react/no-namespace': 'warn',
			'react/no-object-type-as-default-prop': 'warn',
			'react/no-redundant-should-component-update': 'error',
			'react/no-will-update-set-state': 'warn',

			'react/no-this-in-sfc': 'error',
			'react/no-typos': 'error',
			'react/no-unsafe': 'warn',
			'react/no-unstable-nested-components': 'warn',
			'react/no-unused-class-component-methods': ['warn'],
			'react/no-unused-prop-types': ['warn'],
			'react/no-unused-state': 'warn',
			'react/prefer-exact-props': 'warn',
			'react/prefer-read-only-props': 'warn',
			'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],
			'react/self-closing-comp': [
				'error',
				{
					component: true,
					html: true,
				},
			],
			'react/sort-comp': 'warn',
			'react/style-prop-object': 'warn',
			'react/void-dom-elements-no-children': 'error',
			'react/prefer-es6-class': 'warn',
			// 'react/jsx-one-expression-per-line': [
			// 	'warn',
			// 	{
			// 		allow: 'single-child',
			// 	},
			// ],
			'react/jsx-no-leaked-render': 'warn', //
			'react/jsx-no-bind': [
				//
				'warn',
				{
					ignoreRefs: false,
					allowArrowFunctions: true,
					allowFunctions: true,
				},
			],

			// a11y
			'jsx-a11y/alt-text': [
				'error',
				{
					elements: ['img', 'object', 'area', 'input[type="image"]'],
					img: ['Image', 'Icon', 'CustomImage'],
					object: ['Object'],
					area: ['Area'],
					'input[type="image"]': ['InputImage'],
				},
			],
			// "jsx-a11y/anchor-ambiguous-text":"warn",
			'jsx-a11y/control-has-associated-label': 'warn',
			'jsx-a11y/img-redundant-alt': 'warn',
			'jsx-a11y/lang': 'error',
			'jsx-a11y/no-autofocus': 0,
			'jsx-a11y/no-distracting-elements': 'warn',
			'jsx-a11y/no-static-element-interactions': 'warn',
			'jsx-a11y/prefer-tag-over-role': 'error',

			//JS
			eqeqeq: ['error', 'always'],
			quotes: ['warn', 'single'],
			camelcase: ['error', { ignoreImports: true }],
			curly: ['error', 'multi-line'],
			'for-direction': 'error',
			'no-class-assign': 'error',
			'no-compare-neg-zero': 'error',
			'no-cond-assign': 'error',
			'no-duplicate-imports': 'error',
			'no-dupe-keys': 'error',
			'no-invalid-regexp': 'error',
			'no-self-compare': 'error',
			'no-unreachable': 'error',
			'no-unused-vars': 'error',
			'no-console': 'warn',
			'no-var': 'error',
			'prefer-const': 'error',
			'sort-imports': [
				'error',
				{
					ignoreCase: false,
					ignoreDeclarationSort: false,
					ignoreMemberSort: false,
					memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
					allowSeparatedGroups: false,
				},
			],
			'sort-vars': 'error',
			'vars-on-top': 'error',
		},
	},
]
