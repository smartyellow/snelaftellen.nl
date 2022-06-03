export function parseCookieString(string?: string): Record<string, string> {
	if (!string) return {};
	return string
		.split(';')
		.map(c => c.split('='))
		.reduce((obj, arr) => {
			obj[decodeURIComponent(arr[0].trim())] = decodeURIComponent(arr[1].trim());
			return obj;
		}, {});
}
