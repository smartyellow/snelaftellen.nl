import { mkdir, readFile, writeFile } from 'fs/promises';

(async () => {

	await mkdir('out', { recursive: true });

	const locations = JSON.parse(
		await readFile('out/offset.json')
	);

	for (const id of Object.keys(locations)) {
		const nameArray = id.replace(/_/g, ' ').split('/');
		locations[id].continent = nameArray.slice(0, -1).join('/');
		locations[id].place = nameArray[nameArray.length - 1];
	}

	await writeFile(
		'out/names.json',
		JSON.stringify(locations)
	);

})();
