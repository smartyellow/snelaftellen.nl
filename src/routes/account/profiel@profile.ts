import { getSession } from '$lib/molecules/account/server';
import { db } from '$lib/mongodb';
import { parseCookieString } from '$lib/server';
import type { Countdown } from '$lib/molecules/countdown/helpers';
import type { RequestHandler } from './__types/profiel@profile';
import type { User } from '$lib/molecules/account/helpers';

const users = db.collection<User>('users');
const countdowns = db.collection<Countdown>('countdowns');

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

	const countdownCount = await countdowns.countDocuments({
		user: user._id,
	});

	delete user.hashedPassword;

	return {
		status: 200,
		body: {
			user,
			countdownCount,
		},
	};
}
