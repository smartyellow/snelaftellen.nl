import { pimpOptionsFromSearchParams } from '$lib/molecules/pimp/helpers';
import { months } from '$lib/constants';
import { lunarPhase } from '$lib/molecules/moon/helpers';
import { yearCalendar } from '$lib/molecules/calendar/server';

/** @type {import('./index').RequestHandler} */
export async function get({ url, params }) {
	/** @type {Date} */ let countTo;

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

	return {
		body: JSON.parse(JSON.stringify({
			countTo,
			pimpOptions: pimpOptionsFromSearchParams(url.searchParams),
			lunarPhase: lunarPhase(countTo),
			calendar: yearCalendar(countTo.getFullYear()),
		})),
	};
}
