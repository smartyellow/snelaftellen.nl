import { mkdir, readFile, writeFile } from 'fs/promises';

function utcOffset(date) {
	const localTime = date.split(':');
	const utcTime = new Date().toLocaleTimeString('nl-NL', {
		timeZone: 'UTC',
		timeStyle: 'short',
	}).split(':');

	const localMins = (Number(localTime[0]) * 60) + Number(localTime[1]);
	const utcMins = (Number(utcTime[0]) * 60) + Number(utcTime[1]);

	return (localMins - utcMins) / 60;
}

(async () => {

	await mkdir('out', { recursive: true });

	const locations = JSON.parse(
		await readFile('out/coords.json')
	);

	for (const id of Object.keys(locations)) {
		locations[id].utcOffset = utcOffset(
			new Date().toLocaleTimeString('nl-NL', {
				timeZone: id,
				timeStyle: 'short',
			})
		);
		console.log(id, locations[id].utcOffset);
	}

	await writeFile(
		'out/offset.json',
		JSON.stringify(locations)
	);

})();
