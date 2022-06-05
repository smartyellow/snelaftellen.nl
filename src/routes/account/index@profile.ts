import { getSession } from '$lib/molecules/account/server';
import { parseCookieString } from '$lib/server';
import type { RequestHandler } from './__types/index@profile';

export const get: RequestHandler = async ({ request }) => {
	const cookies = parseCookieString(request.headers.get('cookie'));

	if (cookies.session != '0' && await getSession(cookies.session)) {
		return {
			status: 308,
			headers: {
				location: '/account/profiel',
			},
		};
	}

	return {
		status: 308,
		headers: {
			location: '/account/inloggen',
		},
	};
}
