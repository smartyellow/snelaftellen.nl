/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Session {
		user?: import('$lib/molecules/account/helpers').User;
	}

	interface Locals {}
	interface Platform {}
	interface Stuff {}
}

/**
 * Workaround for typings for vite-imagetools.
 * @see https://github.com/JonasKruckenberg/imagetools/issues/160
 * @see https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite
 * @see https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
 * @see https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
 */
declare module '*&img' {
	const out;
	export default out;
}

/**
 * Workaround for typings for vite-imagetools.
 * @see https://github.com/JonasKruckenberg/imagetools/issues/160
 * @see https://github.com/JonasKruckenberg/imagetools/tree/main/packages/vite
 * @see https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
 * @see https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
 */
declare module '*?img' {
	const out;
	export default out;
}
