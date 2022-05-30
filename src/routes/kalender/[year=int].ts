import { yearCalendar } from '$lib/molecules/calendar/server';
import type { RequestHandler } from './__types/[year=int]';

export const get: RequestHandler = async ({ params }) => {
	const year = Number(params.year);

	if (year === new Date().getFullYear()) return {
		status: 307,
		headers: {
			location: '/kalender',
		},
	}

	return {
		body: {
			calendar: yearCalendar(year),
			year: year,
		},
	};
}
