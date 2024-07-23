import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import vueEslint from 'eslint-plugin-vue';
import prettierEslintConfig from 'eslint-config-prettier';
import globals from 'globals';

const banTsCommentConfig = { descriptionFormat: '^ TS\\d+: .+$' };

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...vueEslint.configs['flat/recommended'],
	prettierEslintConfig,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.nodeBuiltin,
			},
		},
		rules: {
			'no-console': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
			'no-debugger': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
			'@typescript-eslint/ban-ts-comment': [
				'error',
				{
					'ts-check': banTsCommentConfig,
					'ts-ignore': banTsCommentConfig,
					'ts-expect-error': banTsCommentConfig,
					'ts-nocheck': true,
				},
			],
		},
	},
);
