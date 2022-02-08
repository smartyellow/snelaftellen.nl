import type { EndpointOutput, RequestEvent } from '@sveltejs/kit';
import { countdownOptions } from '$lib/constants';

export function get(req: RequestEvent): EndpointOutput {
	const { option } = req.params;
	const redirectTo = `/${option}`;

	if (!countdownOptions.includes(option)) return {
		status: 404
	};

	return {
		status: 301, // Moved Permanently
		headers: {
			Location: redirectTo
		}
	};
}
