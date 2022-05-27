import '@sveltejs/kit/install-fetch';
import type { HttpMethod } from '@sveltejs/kit/types/private';

export function request({ url, method = 'get', headers, options }: {
	url: string;
	method?: HttpMethod;
	headers?: Headers;
	options?: RequestInit;
}): Promise<Response> {

	return fetch(url, {
		method,
		headers: {
			'x-apikey': process.env.APIKEY_INTERNAL,
			...headers,
		},
		...options,
	});

}
