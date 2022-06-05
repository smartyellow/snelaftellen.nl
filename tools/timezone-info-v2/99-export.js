import { MongoClient } from 'mongodb';
import { readFile } from 'fs/promises';

/**
 * @param {Array<T>} array
 * @param {string} idKey
 * @returns {Array<T>}
 */
function mapIds(array, idKey) {
	return array.map(i => {
		i._id = i[idKey];
		delete i[idKey];
		return i;
	});
}

(async () => {

	const { countries, zones } = JSON.parse(
		await readFile('out/normalised.json')
	);

	const client = new MongoClient('mongodb://localhost:27017/snelaftellen');
	await client.connect();
	const db = client.db('snelaftellen');

	let collection = db.collection('countries');
	await collection.insertMany(mapIds(countries, 'id'));

	collection = db.collection('timezones');
	await collection.insertMany(mapIds(zones, 'name'));

	await client.close();

})();
