import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';
import path from 'path';
import { mdsvex } from 'mdsvex';
import { imagetools } from 'vite-imagetools';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		preprocess({
			postcss: {
				plugins: [autoprefixer()]
			}
		}),
		mdsvex({
			extensions: ['.md']
		})
	],

	kit: {
		appDir: 'gen',
		adapter: adapter(),
		vite: {
			plugins: [imagetools()],
			resolve: {
				alias: {
					$static: path.resolve('./static'),
					$gfx: path.resolve('./src/gfx')
				}
			},
		},
	}
};

export default config;
