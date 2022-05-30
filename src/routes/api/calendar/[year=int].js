import { yearCalendar } from '$lib/molecules/calendar/server';

/** @type {import('./[year=int]').RequestHandler} */
export function get({ params }) {
	return {
		body: yearCalendar(Number(params.year)),
	};
}
