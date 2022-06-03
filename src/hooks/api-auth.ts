import { authenticate } from "$lib/api/auth";
import type { Handle } from "@sveltejs/kit";

export const apiAuth: Handle = async ({ event, resolve }) => {
	if (
		event.url.pathname.startsWith('/api')
		&& !event.url.pathname.startsWith('/api-internal')
	) {
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

	return await resolve(event);
}
