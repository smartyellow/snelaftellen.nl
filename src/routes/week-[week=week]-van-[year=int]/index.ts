import { isInt } from "$lib/helpers";
import { yearCalendar } from "$lib/molecules/calendar/server";
import { lunarPhase } from "$lib/molecules/moon/helpers";
import { pimpOptionsFromSearchParams } from "$lib/molecules/countdown/pimp/helpers";
import type { RequestHandler } from './__types/index';
import { getUserByRequest } from "$lib/molecules/account/server";
import type { Countdown } from "$lib/molecules/countdown/helpers";
import { csrf } from "$lib/csrf";

export const get: RequestHandler = async ({
	clientAddress, url, params, request,
}) => {
	const user = await getUserByRequest(request);
	const { week, year } = params;

	if (!(isInt(week) || isInt(year)))
		return {
			status: 404
		};

	// Thanks to https://stackoverflow.com/a/8803300
	const beginningOfYear = new Date('Jan 01, ' + year + ' 01:00:00');
	const weekStart = beginningOfYear.getTime() + 604800000 * (parseInt(week) - 1) + 172800000;
	const countTo = new Date(weekStart);
	const countdown: Countdown = {
		pimpOptions: pimpOptionsFromSearchParams(url.searchParams),
		countTo,
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
			week,
			year,
			lunarPhase: lunarPhase(countTo),
			calendar: yearCalendar(countTo.getFullYear()),
			user,
		})),
	};
}
