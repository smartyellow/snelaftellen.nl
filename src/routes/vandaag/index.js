import { yearCalendar } from '$lib/molecules/calendar/server';
import { lunarPhase } from '$lib/molecules/moon/helpers'

/** @type {import('./index').RequestHandler} */
export async function get() {
	const today = new Date();

	return {
		body: JSON.parse(JSON.stringify({
			lunarPhase: lunarPhase(today),
			calendar: yearCalendar(today.getFullYear()),
		})),
	};
}
