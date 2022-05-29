import { pimpOptionsFromSearchParams } from '$lib/molecules/pimp/helpers';
import { months } from '$lib/constants';
import { lunarPhase } from '$lib/molecules/moon/helpers';

/** @type {import('./index').RequestHandler} */
export async function get({ url, params }) {
	let countTo: Date;

	if (params.day) {
		countTo = new Date(
			parseInt(params.year),
			months.indexOf(params.month),
			parseInt(params.day)
		);
	} else if (params.month) {
		countTo = new Date(parseInt(params.year), parseInt(params.month) - 1, 1);
	} else if (params.year) {
		countTo = new Date(
			parseInt(params.year),
			0, // Month is required, so default to January.
			1
		);
	} else return { status: 400 };

	return {
		body: {
			countTo,
			pimpOptions: JSON.parse(JSON.stringify(
				pimpOptionsFromSearchParams(url.searchParams)
			)),
			lunarPhase: JSON.parse(JSON.stringify(
				lunarPhase(countTo)
			)),
		},
	};
}
