import { timezones } from '$lib/molecules/time/timezones/server';
import type { RequestHandler } from './__types/ids';

export const get: RequestHandler = async () => {
	return {
		body: timezones.map(tz => tz._id),
	};
}
