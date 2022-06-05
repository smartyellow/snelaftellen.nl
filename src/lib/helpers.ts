import { writable } from "svelte/store";

export type Visibility = 'public' | 'invisible' | 'private';

export const loading = writable(false);

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

export function randomString(length: number, lowercase = false): string {
	let chars = 'qwertyuiopasdfghjklzxcvbnm1234567890';
	if (!lowercase) chars += 'QWERTYUIOPASDFGHJKLZXCVBNM';
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

export function arrayToObject<T>(
	array: Array<T>,
	idKey: string
): Record<string, T> {
	const out = {};
	for (const value of array) {
		if (typeof value !== 'object') throw 'Values must be objects';
		out[value[idKey]] = value;
	}
	return out;
}

// TODO: lat lng formatter
//export function formatLatLng(location: number): string {
//	const array = location.toString().split('.');
//	const one = array[0];
//	const two = array[1].slice(0, 2)
//	return `${one}°${two}'`
//}
