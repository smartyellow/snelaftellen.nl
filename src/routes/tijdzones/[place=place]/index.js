import { timezoneIds, timezones } from '$lib/molecules/timezones/helpers';

/** @type {import('./index').RequestHandler} */
export async function get({ params }) {
	const timezoneId = timezoneIds.filter(tzId => (
		timezones[tzId].place.toLowerCase() === params.place
	))[0];

	const timezone = {
		...timezones[timezoneId],
		id: timezoneId,
	};

	const sameOffset = timezoneIds.filter(tzId =>
		(timezones[tzId].utcOffset === timezone.utcOffset)
		&& (tzId !== timezoneId)
	).map(tzId => timezones[tzId]);

	return {
		body: JSON.parse(JSON.stringify({
			timezone,
			sameOffset,
		})),
	};
}
