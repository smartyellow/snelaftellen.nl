import { timezones } from '$lib/molecules/timezones/helpers';
import type { RequestHandler } from './__types/index';

export const get: RequestHandler = async () => {
	return {
		body: JSON.parse(JSON.stringify({
			timezones: timezones,
		})),
	};
}
