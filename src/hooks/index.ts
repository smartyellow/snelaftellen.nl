import 'dotenv/config';
import { sequence } from '@sveltejs/kit/hooks';
import { client } from '$lib/mongodb';
import { apiAuth } from './api-auth';

console.log('Internal API key:', process.env.APIKEY_INTERNAL);
client.connect()
	.then(() => console.log('Successfully connected to MongoDB'))
	.catch(err => {
		throw new Error('Error while connecting to MongoDB: ' + err);
	});

export const handle = sequence(apiAuth);
