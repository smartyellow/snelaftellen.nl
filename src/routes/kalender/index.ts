import { yearCalendar } from '$lib/molecules/calendar/server';
import type { RequestHandler } from './__types/index';

export const get: RequestHandler = async ({ params }) => {
	return {
		body: {
			calendar: yearCalendar(new Date().getFullYear()),
		},
	};
}
