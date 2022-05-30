import type { RequestHandler } from './__types/[url]';

export const get: RequestHandler = async ({ params }) => {
	const { url } = params;
	const apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url).replace(
		/%23/g,
		'%2523'
	)}`;
	const res = await fetch(apiUrl);
	const output = await res.text();

	if (res.text) {
		return {
			body: output
		};
	}
}
