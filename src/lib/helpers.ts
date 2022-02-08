export function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isInt(input: string | number): boolean {
	let value: string;
	if (typeof input === 'number') value = ` ${input} `;
	return Number.isInteger(parseInt(value));
}
