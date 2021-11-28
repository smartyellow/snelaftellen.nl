import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		appDir: '_',
		target: '#svelte',
		adapter: adapter(),
		router: false
	}
};

export default config;
