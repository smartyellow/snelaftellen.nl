import { mkdir, readFile, writeFile } from 'fs/promises';

(async () => {

	await mkdir('out', { recursive: true });

	const coords = {};
	const locations = JSON.parse(
		await readFile('out/locations-mapped.json')
	);

	for (const [ tzId, data ] of Object.entries(locations)) {
		if (!data) {
			coords[tzId] = {
				lat: null,
				lng: null,
			};
		}
		else {
			coords[tzId] = {
				lat: data.lat,
				lng: data.lon,
			};
		}
	}

	await writeFile(
		'out/coords.json',
		JSON.stringify(coords)
	);

})();
