import { MongoClient } from 'mongodb';
import { writeFile } from 'fs/promises';

(async () => {

	const client = new MongoClient('mongodb://localhost:27017/snelaftellen');
	await client.connect();
	const db = client.db('snelaftellen');
	const collection = db.collection('timezones');

	const timezones = await collection.find().toArray();
	const ids = timezones.map(tz => tz._id);

	await client.close();
	await writeFile('out/ids.json', JSON.stringify(ids));

})();
