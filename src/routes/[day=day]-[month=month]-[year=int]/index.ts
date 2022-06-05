import { pimpOptionsFromSearchParams } from '$lib/molecules/countdown/pimp/helpers';
import { months } from '$lib/constants';
import { lunarPhase } from '$lib/molecules/moon/helpers';
import { yearCalendar } from '$lib/molecules/calendar/server';
import type { RequestHandler } from './__types/index';
import { getUserByRequest } from '$lib/molecules/account/server';
import type { Countdown } from '$lib/molecules/countdown/helpers';
import { csrf } from '$lib/csrf';

export const get: RequestHandler = async ({
	clientAddress, url, params, request,
}) => {
	const user = await getUserByRequest(request);
	let countTo: Date;

	if (params.day) {
		countTo = new Date(
			parseInt(params.year),
			months.indexOf(params.month),
			parseInt(params.day)
		);
	} else if (params.month) {
		countTo = new Date(parseInt(params.year), parseInt(params.month) - 1, 1);
	} else if (params.year) {
		countTo = new Date(
			parseInt(params.year),
			0, // Month is required, so default to January.
			1
		);
	} else return { status: 400 };

	const countdown: Countdown = {
		countTo,
		pimpOptions: pimpOptionsFromSearchParams(url.searchParams),
	};
	const csrfEntry = await csrf.add({
		userAgent: request.headers.get('user-agent'),
		ipAddress: clientAddress,
	});
	const csrfToken = csrfEntry.encrypted;

	return {
		body: JSON.parse(JSON.stringify({
			countdown,
			csrf: csrfToken,
			lunarPhase: lunarPhase(countTo),
			calendar: yearCalendar(countTo.getFullYear()),
			user,
		})),
	};
}
