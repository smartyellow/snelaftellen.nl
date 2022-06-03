export function get() {
	return {
		status: 308,
		headers: {
			'set-cookie': 'session=0',
			'location': '/account/inloggen',
		},
	};
}
