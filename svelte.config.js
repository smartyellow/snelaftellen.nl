import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';
import { imagetools } from 'vite-imagetools';
import autoprefixer from 'autoprefixer';
import replace from '@rollup/plugin-replace';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		preprocess({
			postcss: {
				plugins: [ autoprefixer() ]
			}
		}),
		mdsvex({ extensions: [ '.md' ] }),
	],

	kit: {
		appDir: 'gen',
		adapter: adapter(),
		vite: {
			plugins: [ imagetools() ],
			server: {
				fs: {
					allow: [ process.cwd() ],
				},
			},
			build: {
				rollupOptions: {
					plugins: [
						replace({
							'process.env.APIKEY_INTERNAL': () => {
								const chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
								let output = '';

								Array(20).fill('').forEach(() => {
									output += chars[Math.round(
										Math.random() * (chars.length - 1)
									)];
								});

								return `'${output}'`;
							},
						}),
					],
				},
			},
		},
	},
};

export default config;
