import { isInt } from "$lib/helpers";
import { yearCalendar } from "$lib/molecules/calendar/server";
import { lunarPhase } from "$lib/molecules/moon/helpers";
import { pimpOptionsFromSearchParams } from "$lib/molecules/pimp/helpers";
import type { RequestHandler } from './__types/index';

export const get: RequestHandler = async ({ url, params }) => {
	const { week, year } = params;

	if (!(isInt(week) || isInt(year)))
		return {
			status: 404
		};

	// Thanks to https://stackoverflow.com/a/8803300
	const beginningOfYear = new Date('Jan 01, ' + year + ' 01:00:00');
	const weekStart = beginningOfYear.getTime() + 604800000 * (parseInt(week) - 1) + 172800000;
	const countTo = new Date(weekStart);

	return {
		body: JSON.parse(JSON.stringify({
			week,
			year,
			countTo,
			pimpOptions: pimpOptionsFromSearchParams(url.searchParams),
			lunarPhase: lunarPhase(countTo),
			calendar: yearCalendar(countTo.getFullYear()),
		})),
	};
}
