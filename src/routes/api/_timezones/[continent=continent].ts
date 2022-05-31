import { timezones } from '$lib/molecules/timezones/helpers';
import type { RequestHandler } from './__types/[continent=continent]';

export const get: RequestHandler = async ({ params }) => {
	const filteredKeys = Object.keys(timezones).filter(tz =>
		timezones[tz].continent.toLowerCase()
		=== params.continent.toLowerCase()
	);
	const filteredTimezones = {};

	for (const key of filteredKeys) {
		filteredTimezones[key] = timezones[key];
	}

	return {
		body: filteredTimezones,
	};
}
