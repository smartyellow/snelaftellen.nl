import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';
import path from 'path';
import { mdsvex } from 'mdsvex';
import { imagetools } from 'vite-imagetools';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.md']
		})
	],

	kit: {
		appDir: 'gen',
		adapter: adapter(),
		prerender: {
			crawl: true,
			enabled: true,
			entries: ['*'],
			onError: 'continue'
		},
		vite: {
			plugins: [imagetools()],
			resolve: {
				alias: {
					$static: path.resolve('./static'),
					$gfx: path.resolve('./src/gfx')
				}
			}
		}
	}
};

export default config;
