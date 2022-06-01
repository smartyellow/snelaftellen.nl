import { mkdir, readFile, writeFile } from 'fs/promises';
import { timezoneIds } from './util';

(async () => {

	await mkdir('out', { recursive: true });

	const mappedLocations = {};
	const locations = JSON.parse(
		await readFile('out/locations.json')
	);

	for (const [ i, location ] of locations.entries()) {
		mappedLocations[timezoneIds[i]] = location;
	}

	await writeFile(
		'out/locations-mapped.json',
		JSON.stringify(mappedLocations)
	);

})();
