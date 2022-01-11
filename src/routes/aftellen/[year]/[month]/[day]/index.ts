import { months } from "$lib/constants";
import type { EndpointOutput, Request } from "@sveltejs/kit";

export function get(req: Request): EndpointOutput {
	const { year, month, day } = req.params;
	const redirectTo = `/${day}-${months[month]}-${year}`;

	return {
		status: 301, // Moved Permanently
		headers: {
			'Location': redirectTo
		}
	}
}
