//export type MoonPhaseName =
//	| 'New'
//	| 'Waxing Crescent'
//	| 'First Quarter'
//	| 'Waxing Gibbous'
//	| 'Full'
//	| 'Waning Gibbous'
//	| 'Last Quarter'
//	| 'Waning Crescent';

import { julianDate } from "$lib/dates";

export const LUNAR_MONTH = 29.530588853;

export interface LunarPhase {
	nl: string,
	en: string,
	id: string,
	url: string
};

export type LunarPhaseWithDate = LunarPhase & {
	date: Date;
};

export const lunarPhases: LunarPhase[] = [
	{
		nl: 'Nieuwe maan',
		en: 'New',
		id: 'nw',
		url: 'https://nl.wikipedia.org/wiki/Nieuwe_maan'
	},
	{
		nl: 'Wassende maan (sikkel)',
		en: 'Waxing Crescent',
		id: 'xc',
		url: 'https://nl.wikipedia.org/wiki/Wassende_en_afnemende_maan'
	},
	{
		nl: 'Eerste kwartier',
		en: 'First Quarter',
		id: 'fq',
		url: 'https://nl.wikipedia.org/wiki/Eerste_kwartier'
	},
	{
		nl: 'Wassende maan',
		en: 'Waxing Gibbous',
		id: 'xg',
		url: 'https://nl.wikipedia.org/wiki/Wassende_en_afnemende_maan'
	},
	{
		nl: 'Volle maan',
		en: 'Full',
		id: 'fl',
		url: 'https://nl.wikipedia.org/wiki/Volle_maan_(astronomie)'
	},
	{
		nl: 'Afnemende maan',
		en: 'Waning Gibbous',
		id: 'ng',
		url: 'https://nl.wikipedia.org/wiki/Wassende_en_afnemende_maan'
	},
	{
		nl: 'Laatste kwartier',
		en: 'Last Quarter',
		id: 'lq',
		url: 'https://nl.wikipedia.org/wiki/Laatste_kwartier'
	},
	{
		nl: 'Afnemende maan (sikkel)',
		en: 'Waning Crescent',
		id: 'nc',
		url: 'https://nl.wikipedia.org/wiki/Wassende_en_afnemende_maan'
	},
];

export function lunarAgePercentage(date: Date): number {
	function normalise(value: number): number {
		value = value - Math.floor(value);
		if (value < 0) value = value + 1
		return value;
	}

	return normalise((julianDate(date) - 2451550.1) / LUNAR_MONTH);
}

export function lunarAge(input: Date | number): number {
	let percentage: number;
	if (input instanceof Date) percentage = lunarAgePercentage(input);
	else if (typeof input === 'number') percentage = input;
	else throw 'Input is neither a date nor a number.';

	return percentage * LUNAR_MONTH;
}

export function lunarPhase(input: Date | number): LunarPhase {
	let age: number;
	if (input instanceof Date) age = lunarAge(input);
	else if (typeof input === 'number') age = input;
	else throw 'Input is neither a date nor a number.';

	function getName(): string {
		if (age < 1.84566) return "New";
		else if (age < 5.53699) return "Waxing Crescent";
		else if (age < 9.22831) return "First Quarter";
		else if (age < 12.91963) return "Waxing Gibbous";
		else if (age < 16.61096) return "Full";
		else if (age < 20.30228) return "Waning Gibbous";
		else if (age < 23.99361) return "Last Quarter";
		else if (age < 27.68493) return "Waning Crescent";
		else return "New";
	}

	const name = getName();
	return lunarPhases.find(p => p.en === name);
}
