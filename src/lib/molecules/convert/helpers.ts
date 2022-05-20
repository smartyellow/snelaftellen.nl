export type ConversionFunction = (minutes: number) => number;
export interface Conversion {
	name: string;
	singular: string;
	fromMins: ConversionFunction;
	toMins: ConversionFunction;
};

export const units: Record<string, Conversion> = {
	year: {
		name: 'jaren',
		singular: 'jaar',
		fromMins: m => m / 60 / 24 / 365.25,
		toMins: m => m * 60 * 24 * 365.25,
	},
	month: {
		name: 'maanden (30 dagen)',
		singular: 'maand',
		fromMins: m => m / 60 / 24 / 30,
		toMins: m => m * 60 * 24 * 30,
	},
	days: {
		name: 'dagen',
		singular: 'dag',
		fromMins: m => m / 60 / 24,
		toMins: m => m * 60 * 24,
	},
	hours: {
		name: 'uren',
		singular: 'uur',
		fromMins: m => m / 60,
		toMins: m => m * 60,
	},
	minutes: {
		name: 'minuten',
		singular: 'minuut',
		fromMins: m => m,
		toMins: m => m,
	},
	seconds: {
		name: 'seconden',
		singular: 'seconde',
		fromMins: m => m * 60,
		toMins: m => m / 60,
	},
	milliseconds: {
		name: 'milliseconden',
		singular: 'milliseconde',
		fromMins: m => m * 60 * 1000,
		toMins: m => m / 60 / 1000,
	},
};
