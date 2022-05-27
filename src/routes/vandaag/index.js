import { lunarPhase } from '$lib/molecules/moon/helpers'

/** @type {import('./index').RequestHandler} */
export async function get() {
	return {
		body: JSON.parse(JSON.stringify({
			lunarPhase: lunarPhase(new Date())
		})),
	};
}
