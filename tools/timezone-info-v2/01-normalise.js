import { mkdir, readFile, writeFile } from 'fs/promises';

(async () => {

	await mkdir('out', { recursive: true });

	const { countries, zones: zoneMeta } = JSON.parse(
		await readFile('in/meta.json')
	);
	let { zones } = JSON.parse(await readFile('in/zones.json'));
	const outCountries = [];

	for (const key of Object.keys(countries)) {
		delete countries[key].abbr;
		outCountries.push({
			...countries[key],
			id: key,
		});
	}

	zones = zones.map(zone => {
		let zoneName = zone.name;
		if (zone.name === 'Africa/Asmera') zoneName = 'Africa/Asmara';
		zoneName = zoneName.replace(/_/g, ' ');
		const zoneNameArray = zoneName.split('/');

		if (!zoneMeta[zoneName]) return;

		zone.lat = zoneMeta[zoneName].lat;
		zone.lng = zoneMeta[zoneName].long;
		zone.offsets = zone.offsets.map(o => o !== null ? o * -1 : null);

		if (zoneNameArray.length) {
			zone.continent = zoneNameArray[0];
			zone.place = zoneNameArray[zoneNameArray.length - 1];
		}
		else {
			zone.continent = null;
			zone.place = null;
		}

		return zone;
	}).filter(z => z != null);

	await writeFile(
		'out/normalised.json',
		JSON.stringify({
			countries: outCountries,
			zones,
		})
	);

})();
