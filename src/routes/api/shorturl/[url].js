/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	const { url } = params;
	const apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
	const res = await fetch(apiUrl);
	const output = await res.text();

	if (res.text) {
		return {
			body: output
		};
	}
}
