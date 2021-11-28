import { randomImage } from "$lib/randomimage";
import type { EndpointOutput } from "@sveltejs/kit";

export function get({ params }: { params: { theme: string } }): EndpointOutput {
	const image = randomImage(params.theme);

	if (typeof image === 'string') {
		return {
			body: {
				image
			}
		};
	}
}
