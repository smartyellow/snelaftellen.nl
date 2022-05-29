import { timezones } from '$lib/molecules/timezones/helpers';

/** @type {import('./index').RequestHandler} */
export async function get({ url }) {
	return {
		body: JSON.parse(JSON.stringify(timezones)),
	};
}
