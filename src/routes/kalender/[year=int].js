import { yearCalendar } from '$lib/molecules/calendar/server';

/** @type {import('./[year=int]').RequestHandler} */
export function get({ params }) {
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
