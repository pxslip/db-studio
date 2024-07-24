import eslintConfig from '@db-studio/config/eslint.js';

export default /** @type {import('eslint').Linter.Config} */ [
	...eslintConfig,
	{
		ignores: ['dist/', 'tests/', '**/dist/', '**/*.test.ts'],
	},
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: ['api/src/utils/validate-query.ts'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},
];
