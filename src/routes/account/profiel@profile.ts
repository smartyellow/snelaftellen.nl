import type { User } from '$lib/molecules/account/helpers';
import { getSession } from '$lib/molecules/account/server';
import { db } from '$lib/mongodb';
import { parseCookieString } from '$lib/server';
import type { RequestHandler } from './__types/profiel@profile';

const users = db.collection<User>('users');

export const get: RequestHandler = async ({ request }) => {
	const err = {
		status: 308,
		headers: {
			location: '/account/inloggen',
		},
	};

	const sessionId = parseCookieString(request.headers.get('cookie')).session;
	if (sessionId == '0' || !sessionId) return err;

	const session = await getSession(sessionId);
	if (!session) return err;

	const user = await users.findOne({
		_id: session.user,
	});
	if (!user) return err;

	return {
		status: 200,
		body: {
			user,
		},
	};
}
