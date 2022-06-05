import { csrf } from '$lib/csrf';
import { randomString } from '$lib/helpers';
import { getSession } from '$lib/molecules/account/server';
import type { Countdown } from '$lib/molecules/countdown/helpers';
import { db } from '$lib/mongodb';
import { parseCookieString } from '$lib/server';
import type { RequestHandler } from './__types/save';

const countdowns = db.collection<Countdown>('countdowns');

export const post: RequestHandler = async ({ request }) => {
	const err = { status: 400 };

	const data = await request.json();
	const cookies = parseCookieString(request.headers.get('cookie'));
	const sessionId = cookies.session;
	if (!sessionId) return err;

	const session = await getSession(sessionId);
	if (!session) return err;

	const csrfToken: string = data.csrf;
	if (!csrfToken) return err;

	const csrfEntry = await csrf.get(csrf.toObject(csrfToken)._id);
	if (!csrfEntry || csrfEntry.expired) return err;

	const countdown: Countdown = data.countdown;
	if (!countdown.countTo || !countdown.title) return err;
	countdown.countTo = new Date(countdown.countTo);

	const result = await countdowns.insertOne({
		...countdown,
		user: session.user,
		_id: randomString(8, true),
	});
	if (!result.acknowledged) return { status: 500 };

	return {
		status: 201,
		body: JSON.parse(JSON.stringify({
			countdown: {
				...countdown,
				_id: result.insertedId,
				user: session.user,
			},
		})),
	};
}

export const put: RequestHandler = async ({ request }) => {
	const err = { status: 400 };

	const data = await request.json();
	const cookies = parseCookieString(request.headers.get('cookie'));
	const sessionId = cookies.session;
	if (!sessionId) return err;

	const session = await getSession(sessionId);
	if (!session) return err;

	const csrfToken: string = data.csrf;
	if (!csrfToken) return err;

	const csrfEntry = await csrf.get(csrf.toObject(csrfToken)._id);
	if (!csrfEntry || csrfEntry.expired) return err;

	const countdown = await countdowns.findOne({
		_id: data.countdown._id,
	});

	if (!countdown) return err;
	countdown.countTo = new Date(countdown.countTo);

	const countdownWithoutId = JSON.parse(JSON.stringify(data.countdown));
	delete countdownWithoutId._id;
	delete countdownWithoutId.user;
	countdownWithoutId.countTo = new Date(countdownWithoutId.countTo);

	const result = await countdowns.updateOne({
		_id: data.countdown._id,
	}, { $set: countdownWithoutId });
	if (!result.acknowledged) return { status: 500 };

	return {
		status: 200,
		body: {
			countdown: {
				...countdownWithoutId,
				_id: data.countdown._id,
			},
		},
	};
}
