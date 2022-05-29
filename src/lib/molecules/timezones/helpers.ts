import { dedupe } from "$lib/helpers";
import data from './data.json';

export interface Timezone {
	id?: string;
	continent: string;
	place: string;
	utcOffset: number;
}

export interface Coords {
	lat: number;
	lng: number;
}

export type TimezoneWithCoords = Timezone & Coords;

// @ts-ignore
export const timezones: Record<string, TimezoneWithCoords> = data;
export const timezoneIds = Object.keys(data);

export const continents: string[] = dedupe(
	timezoneIds.map(tzId => timezones[tzId].continent)
);

export const continentsLowercase: string[] = continents.map(
	c => c.toLowerCase()
);

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

export const places: string[] = timezoneIds.map(
	tzId => timezones[tzId].place
);

export const placesLowercase: string[] = places.map(
	c => c.toLowerCase()
);
