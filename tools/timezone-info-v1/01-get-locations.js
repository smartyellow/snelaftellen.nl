import { mkdir, writeFile } from 'fs/promises';
import fetch from 'node-fetch';
import { timezoneIds } from './util';

(async () => {

	await mkdir('out', { recursive: true });
	const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

	const responses = [];

	async function save() {
		await writeFile('out/locations.json', JSON.stringify(responses));
	}

	console.log(`Started fetching ${timezoneIds.length} timezones.`);
	console.log('');

	for (const [ i, tzId ] of timezoneIds.entries()) {
		const tzArray = tzId.replace(/_/, ' ').split('/');
		const city = tzArray[tzArray.length - 1];

		const data = await new Promise(async resolve => {
			let res = { ok: false };
			let tryNo = 0;

			while (!res.ok) {
				const url = `https://nominatim.openstreetmap.org/search?city=${city}&format=json&accept-language=nl,en`;
				console.log(`Started fetching ${tzId} (${url}).`);

				try {
					res = await fetch(url, {
						headers: {
							'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15',
						},
					});
				}
				catch (err) {
					console.warn(err);
					res = { ok: false };
				}

				if (res.ok) {
					console.log(`${city} - try ${++tryNo}/20 - SUCCEEDED.`)
					const json = await res.json();
					resolve(json);
				}
				else if (tryNo === 20 && !res.ok) {
					console.log(`${city} - try ${++tryNo}/20 - FAILED after 20 tries.`)
					throw new Error(`Processing of ${tzId} did not succeed within 20 tries.`);
				}
				else {
					console.log(`${city} - try ${++tryNo}/20 - trying again in 10 seconds.`)
				}

				await wait(10_000);
			}
		});

		responses.push(data[0]);
		await save();
		console.log(`Done processing timezone ${i + 1}/${timezoneIds.length} (${(i + 1) / timezoneIds.length * 100}%): ${tzId} (${city}).`);
	}

	await save();
	console.log(`Done. Processed ${responses.length}/${timezoneIds.length} timezones.`);

})();
