import { timezoneOffset } from '$lib/molecules/time/timezones/helpers';
import { countries, timezones } from '$lib/molecules/time/timezones/server';
import type { RequestHandler } from './__types/[...tz=tz]';

export const get: RequestHandler = async ({ params }) => {
	const [ timezone ] = timezones.filter(tz => (
		tz._id.toLowerCase() === params.tz
	));

	const sameOffset = timezones.filter(tz =>
		(timezoneOffset(tz) === timezoneOffset(timezone))
		&& (tz._id !== timezone._id)
	);

	return {
		body: JSON.parse(JSON.stringify({
			timezone,
			sameOffset,
			countries,
		})),
	};
}
