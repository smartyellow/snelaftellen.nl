// WIP

import { readFile, writeFile } from 'fs/promises';

(async () => {

	let { countries, zones } = JSON.parse(
		await readFile('out/normalised.json')
	);

	countries.map(country => {
		country.nameEn = {};
	});

	await writeFile(
		'out/locations.json',
		JSON.stringify({
			countries: outCountries,
			zones,
		})
	);

})();
