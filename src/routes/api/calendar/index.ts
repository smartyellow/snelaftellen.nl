import { yearCalendar } from '$lib/molecules/calendar/server';
import type { RequestHandler } from './__types/index';

export const get: RequestHandler = async () => {
	return {
		body: yearCalendar(new Date().getFullYear()),
	};
}
