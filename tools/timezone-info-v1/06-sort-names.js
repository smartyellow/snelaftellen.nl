import { mkdir, readFile, writeFile } from 'fs/promises';

(async () => {

	await mkdir('out', { recursive: true });

	const locations = JSON.parse(
		await readFile('out/names.json')
	);

	const sortedKeys = Object.keys(locations).sort((a, b) => {
		const aArray = a.split('/');
		const bArray = b.split('/');
		a = aArray[aArray.length - 1].toUpperCase();
		b = bArray[bArray.length - 1].toUpperCase();

		if (a < b) return -1;
		if (a > b) return 1;
		return 0;
	});

	const sorted = {};
	for (const key of sortedKeys) {
		sorted[key] = locations[key];
	}

	await writeFile(
		'out/sorted.json',
		JSON.stringify(sorted)
	);

})();
