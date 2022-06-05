export function get() {
	const expires = new Date(1970, 1, 1).toUTCString();

	return {
		status: 308,
		headers: {
			'set-cookie': `session=0; Path=/; Expires=${expires}`,
			'location': '/account/inloggen',
		},
	};
}
