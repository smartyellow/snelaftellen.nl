import { yearCalendar } from '$lib/molecules/calendar/server';
import { lunarPhase } from '$lib/molecules/moon/helpers'
import type { RequestHandler } from './__types/index';

export const get: RequestHandler = async () => {
	const today = new Date();

	return {
		body: JSON.parse(JSON.stringify({
			lunarPhase: lunarPhase(today),
			calendar: yearCalendar(today.getFullYear()),
		})),
	};
}
