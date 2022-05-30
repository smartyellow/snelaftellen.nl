import { yearCalendar } from '$lib/molecules/calendar/server';
import type { RequestHandler } from './__types/[year=int]';

export const get: RequestHandler = async ({ params }) => {
	return {
		body: yearCalendar(Number(params.year)),
	};
}
