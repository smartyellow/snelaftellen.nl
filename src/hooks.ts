import { authenticate } from "$lib/api/auth";
import { randomString } from "$lib/helpers";
import type { Handle } from "@sveltejs/kit";

process.env.APIKEY_INTERNAL = randomString(10);

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
