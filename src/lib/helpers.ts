export function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function random(min: number, max: number) {
	return Math.round(Math.random() * (max - min) + min);
}

export function isInt(input: string | number): boolean {
	let value: string;
	if (typeof input === 'number') value = ` ${input} `;
	else value = input;
	return Number.isInteger(parseInt(value));
}

export function areArraysEqual(a: Array<unknown>, b: Array<unknown>): boolean {
	return (
		Array.isArray(a) &&
		Array.isArray(b) &&
		a.length === b.length &&
		a.every((val, index) => val === b[index])
	);
}

export function areObjectsEqual(a: unknown, b: unknown): boolean {
	// http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html

	const aProps = Object.getOwnPropertyNames(a);
	const bProps = Object.getOwnPropertyNames(b);

	if (aProps.length != bProps.length) {
		return false;
	}

	for (let i = 0; i < aProps.length; i++) {
		const propName = aProps[i];

		if (a[propName] !== b[propName]) {
			return false;
		}
	}

	return true;
}

export function randomString(length: number): string {
	const chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
	let output = '';

	Array(length).fill('').forEach(() => {
		output += chars[random(0, chars.length - 1)];
	});

	return output;
}

export function dedupe<T>(array: Array<T>): Array<T> {
	const output = [];

	for (const value of array) {
		if (!output.includes(value)) output.push(value);
	}

	return output;
}

export function utcOffset(date: string): number {
	const localTime = date.split(':');
	const utcTime = new Date().toLocaleTimeString('nl-NL', {
		timeZone: 'UTC',
	}).split(':');

	const localMins = Number(localTime[0]) * 60 + Number(localTime[1]);
	const utcMins = Number(utcTime[0]) * 60 + Number(utcTime[1]);

	return (utcMins - localMins) / 60;
}
