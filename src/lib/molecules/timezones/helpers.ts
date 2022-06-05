import { nlTimezone } from './data';

export interface Timezone {
	_id?: string;
	continent: string;
	place: string;

	abbrs: string[];
	untils: (number | null)[];
	offsets: number[];

	population: number;
	countries: string[];

	lat: number;
	lng: number;
}

export interface Country {
	_id?: string;
	name: string;
	zones: string[];
}

export const continentsNl = {
	Europe: 'Europa',
	Asia: 'Azië',
	Antarctica: 'Antarctica',
	America: 'Amerika',
	Pacific: 'Pacific',
	Australia: 'Australië',
	Atlantic: 'Atlantic',
	Indian: 'Indië',
	Africa: 'Afrika',
	Argentina: 'Argentinië',
};

export function translateContinentName(name: string): string {
	for (const nameEn of Object.keys(continentsNl)) {
		name = name.replace(nameEn, continentsNl[nameEn]);
	}
	return name;
}

function calcUntilIndex(
	tz: Timezone,
	utc = new Date(),
	isNlTime = false
): number {
	if (!isNlTime) {
		utc.setMinutes(
			utc.getMinutes()
			+ timezoneOffset(nlTimezone, new Date(), true)
		);
	}

	const now = utc.getTime()
	let untilIndex = tz.untils.length - 1;

	loop: for (const [ i, until ] of tz.untils.entries()) {
		if (until >= now) {
			untilIndex = i;
			break loop;
		}
	}

	return untilIndex;
}

export function timezoneOffset(
	tz: Timezone,
	utc = new Date(),
	isNlTime = false
): number {
	const untilIndex = calcUntilIndex(tz, utc, isNlTime);
	return tz.offsets[untilIndex];
}

export function timezoneAbbreviation(
	tz: Timezone,
	utc = new Date(),
	isNlTime = false
): string {
	const untilIndex = calcUntilIndex(tz, utc, isNlTime);
	return tz.abbrs[untilIndex];
}

export function dateByOffset(minutes: number): Date {
	const date = new Date()
	date.setMinutes(date.getMinutes() + minutes - 120);
	return date;
}

export function formatUTCOffset(offset: number, prefix = true): string {
	return (prefix ? 'UTC' : '')
		+ (offset < 0 ? '–' : '+')
		+ Math.abs(offset);
}
