import type { RequestHandlerOutput } from "@sveltejs/kit";

export async function authenticate(apiKey: string): Promise<RequestHandlerOutput | void> {
	if (!process.env.APIKEY_INTERNAL) return;
	if (apiKey !== process.env.APIKEY_INTERNAL) {
		return {
			status: 401,
			body: {
				err: 'You need to send a valid auth parameter to authenticate.'
			},
		};
	}
}
