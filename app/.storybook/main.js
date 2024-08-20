/* global require, module, __dirname */
import { resolve as _resolve } from 'path';
import { mergeConfig } from 'vite';
export async function viteFinal(config) {
	return mergeConfig(config, {
		resolve: {
			dedupe: ['@storybook/client-api'],
			alias: [
				{
					find: '@',
					replacement: _resolve(__dirname, '..', 'src'),
				},
				// { find: 'json2csv', replacement: 'json2csv/dist/json2csv.umd.js' },
			],
		},
	});
}
export const stories = ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'];
export const addons = [
	'@storybook/addon-links',
	'@storybook/addon-essentials',
	'@storybook/addon-actions',
	'@storybook/addon-mdx-gfm',
];
export const framework = {
	name: '@storybook/vue3-vite',
	options: {},
};
export const docs = {
	autodocs: true,
};
