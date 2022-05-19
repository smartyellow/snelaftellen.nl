import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';
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

	compilerOptions: {
		// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
		cssHash: ({ css, hash }) => '_' + hash(css),
	},

	kit: {
		appDir: 'gen',
		adapter: adapter(),
		vite: {
			plugins: [imagetools()],
			server: {
				fs: {
					allow: [process.cwd()]
				}
			}
		}
	}
};

export default config;
