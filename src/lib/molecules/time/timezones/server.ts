import { arrayToObject, dedupe } from '$lib/helpers';
import { db } from '$lib/mongodb';
import type { Country, Timezone } from './helpers';

let updated = new Date();
export let timezones: Timezone[];
export let timezoneIds: string[];
export let timezoneIdsLowercase: string[];
export let continents: string[];
export let continentsLowercase: string[];
export let countries: Country[];
export let countriesObject: Record<string, Country>;

async function refresh() {
	timezones = await db.collection<Timezone>('timezones').find().toArray();
	timezoneIds = timezones.map(tz => tz._id.toString());
	timezoneIdsLowercase = timezoneIds.map(t => t.toLowerCase());
	continents = dedupe(
		timezones.map(tz => tz.continent)
	).filter(c => c !== null);
	continentsLowercase = continents.map(c => c.toLowerCase());

	countries = await db.collection<Country>('countries').find().toArray();
	countriesObject = arrayToObject(countries, '_id');
}

refresh();
setTimeout(() => {
	if ((new Date().getTime() - updated.getTime()) > (1000 * 60 * 10)) {
		refresh()
	}
}, 1000 * 60 * 2);

//export const places: string[] = timezoneIds.map(
//	tzId => timezones[tzId].place
//);

//export const placesLowercase: string[] = places.map(
//	c => c.toLowerCase()
//);
