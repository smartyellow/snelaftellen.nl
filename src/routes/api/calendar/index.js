import { yearCalendar } from '$lib/molecules/calendar/server';

/** @type {import('./index').RequestHandler} */
export function get() {
	return {
		body: yearCalendar(new Date().getFullYear()),
	};
}
