import { months } from "$lib/constants";
import type { EndpointOutput, RequestEvent } from "@sveltejs/kit";

export function get(req: RequestEvent): EndpointOutput {
	const { year, month, day } = req.params;
	const redirectTo = `/${day}-${months[month]}-${year}`;

	return {
		status: 301, // Moved Permanently
		headers: {
			'Location': redirectTo
		}
	}
}
