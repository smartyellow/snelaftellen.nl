import { timezones } from '$lib/molecules/timezones/helpers';

/** @type {import('./index').RequestHandler} */
export async function get({ params }) {
	return {
		body: JSON.parse(JSON.stringify(
			timezones.filter(tz =>
				tz.continent.toLowerCase()
				=== params.continent.toLowerCase()
			)
		)),
	};
}
