import { authenticate } from '$lib/api/auth';
import { client } from '$lib/mongodb';
import type { Handle } from '@sveltejs/kit';

console.log('Internal API key:', process.env.APIKEY_INTERNAL);
client.connect()
	.then(() => console.log('Successfully connected to MongoDB'))
	.catch(err => {
		throw new Error('Error while connecting to MongoDB: ' + err);
	});

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api')) {
		const authResult = await authenticate(
			event.request.headers.get('x-apikey')
		);

		if (!authResult) {
			const response = await resolve(event);
			return response;
		}
		else {
			return new Response(
				JSON.stringify(authResult.body),
				{ status: authResult.status }
			);
		}
	}

	const response = await resolve(event);
	return response;
};
