import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';
import path from 'path';
import { mdsvex } from 'mdsvex';

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
		target: '#svelte',
		adapter: adapter(),
		router: false,
		paths: {
			assets: 'https://cdn-sanl.smartyellow.nl'
		},
		prerender: {
			crawl: true,
			enabled: true,
			entries: ['*'],
			onError: 'continue'
		},
		vite: {
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
