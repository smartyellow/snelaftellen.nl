import { yearCalendar } from "$lib/molecules/calendar/server";
import { lunarPhase } from "$lib/molecules/moon/helpers";
import { pimpOptionsFromSearchParams } from "$lib/molecules/countdown/pimp/helpers";
import { seasons, type Season } from "$lib/molecules/seasons/helpers";
import type { RequestHandler } from './__types/index';
import { getUserByRequest } from "$lib/molecules/account/server";
import type { Countdown } from "$lib/molecules/countdown/helpers";
import { csrf } from "$lib/csrf";

export const get: RequestHandler = async ({
	clientAddress, url, params, request,
}) => {
	const user = await getUserByRequest(request);
	const option = params.season;
	let season: Season;

	Object.entries(seasons).forEach((s) => {
		if (s[1][0] === option) season = s[1];
	});

	if (!season)
		return {
			// This is very unlikely, because of the above validator.
			status: 404
		};

	const countTo = season[3];
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
			user,
			csrf: csrfToken,
			lunarPhase: lunarPhase(countTo),
			calendar: yearCalendar(countTo.getFullYear()),
		})),
	};
}
