import { yearCalendar } from "$lib/molecules/calendar/server";
import { lunarPhase } from "$lib/molecules/moon/helpers";
import { pimpOptionsFromSearchParams } from "$lib/molecules/pimp/helpers";
import { seasons } from "$lib/molecules/seasons/helpers";

/** @type {import('./index').RequestHandler} */
export async function get({ url, params }) {
	const option = params.season;

	/** @type {import('$lib/molecules/seasons/helpers').Season} */
	let season;
	Object.entries(seasons).forEach((s) => {
		if (s[1][0] === option) season = s[1];
	});

	if (!season)
		return {
			// This is very unlikely, because of the above validator.
			status: 404
		};

	const countTo = season[3];

	return {
		body: JSON.parse(JSON.stringify({
			countTo,
			pimpOptions: pimpOptionsFromSearchParams(url.searchParams),
			lunarPhase: lunarPhase(countTo),
			calendar: yearCalendar(countTo.getFullYear()),
		})),
	};
}
