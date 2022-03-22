export function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isInt(input: string | number): boolean {
	let value: string;
	if (typeof input === 'number') value = ` ${input} `;
	else value = input;
	return Number.isInteger(parseInt(value));
}

export function areArraysEqual(a: Array<unknown>, b: Array<unknown>): boolean {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

export function areObjectsEqual(a: Record<any, unknown>, b: Record<any, unknown>): boolean {
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
