import { isInt } from "$lib/helpers";
import { lunarPhase } from "$lib/molecules/moon/helpers";
import { pimpOptionsFromSearchParams } from "$lib/molecules/pimp/helpers";

/** @type {import('./index').RequestHandler} */
export async function get({ url, params }) {
	const { week, year } = params;

	if (!(isInt(week) || isInt(year)))
		return {
			status: 404
		};

	// Thanks to https://stackoverflow.com/a/8803300
	const pimpOptions = pimpOptionsFromSearchParams(url.searchParams);
	const beginningOfYear = new Date('Jan 01, ' + year + ' 01:00:00');
	const weekStart = beginningOfYear.getTime() + 604800000 * (parseInt(week) - 1) + 172800000;
	const countTo = new Date(weekStart);

	return {
		body: JSON.parse(JSON.stringify({
			week,
			year,
			countTo,
			pimpOptions,
			lunarPhase: lunarPhase(countTo),
		})),
	};
}
