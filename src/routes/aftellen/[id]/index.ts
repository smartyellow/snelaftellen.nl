import { lunarPhase } from '$lib/molecules/moon/helpers';
import { yearCalendar } from '$lib/molecules/calendar/server';
import type { RequestHandler } from './__types/index';
import { getUserByRequest } from '$lib/molecules/account/server';
import type { Countdown } from '$lib/molecules/countdown/helpers';
import { csrf } from '$lib/csrf';
import { db } from '$lib/mongodb';

const countdowns = db.collection<Countdown>('countdowns');

export const get: RequestHandler = async ({
	clientAddress, params, request,
}) => {
	const user = await getUserByRequest(request);
	const countdown = await countdowns.findOne({
		_id: params.id,
	});

	if (
		!countdown
		|| (
			(countdown.visibility === 'private')
			&& (user._id !== countdown.user)
		)
	) {
		return {
			status: 404,
		};
	}

	const csrfEntry = await csrf.add({
		userAgent: request.headers.get('user-agent'),
		ipAddress: clientAddress,
	});
	const csrfToken = csrfEntry.encrypted;

	return {
		body: JSON.parse(JSON.stringify({
			countdown,
			csrf: csrfToken,
			lunarPhase: lunarPhase(countdown.countTo),
			calendar: yearCalendar(countdown.countTo.getFullYear()),
			user,
		})),
	};
}
