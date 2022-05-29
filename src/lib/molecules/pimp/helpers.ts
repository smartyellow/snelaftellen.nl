import { writable } from 'svelte/store';
import { months } from '$lib/constants';
import { areObjectsEqual } from '$lib/helpers';

export interface HeaderImage {
	id: string;
	title: string;
}

export const headerImages: HeaderImage[] = [
	{ id: 'balloons', title: 'Ballonnen' },
	{ id: 'christmas', title: 'Kerstmis' },
	{ id: 'flags', title: 'Vlaggenlijn' },
	{ id: 'inmemoriam', title: 'In memoriam' },
	{ id: 'presents', title: 'Cadeautjes' },
	{ id: 'pumpkin', title: 'Pompoen' },
	{ id: 'vacation', title: 'Vakantie' }
];

export type HeaderImageId = typeof headerImages[number]['id'] | 'no';

export interface Theme {
	id: string;
	title: string;
}

export const themes: Theme[] = [
	{ id: 'no', title: 'Geen thema' },
	{ id: '98', title: 'Windows 98' }
];

export type ThemeId = typeof themes[number]['id'];

export interface PimpOptions {
	bg?: string;
	fg?: string;
	yl?: string;
	img?: HeaderImageId;
	title?: string;
	theme?: ThemeId;
}

export const defaultPimpOptions: PimpOptions = {
	bg: '#fff',
	fg: '#000',
	yl: '#f8f5c3',
	img: 'no',
	title: '',
	theme: 'no'
};

export function pimpOptionsFromSearchParams(usp: URLSearchParams): PimpOptions {
	const result: PimpOptions = { ...defaultPimpOptions };
	for (const key of Object.keys(defaultPimpOptions)) {
		if (usp.get(key)) result[key] = usp.get(key);
	}
	return result;
}

export const pimpStore = (() => {
	const { subscribe, set, update } = writable<PimpOptions>({});
	return {
		subscribe,
		set,
		update: (x: PimpOptions) => update(y => ({ ...y, ...x })),
	};
})();

export function getCountdownUrl(date: Date, pimpOptions = defaultPimpOptions): string {
	let output = `/${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;

	if (!areObjectsEqual(pimpOptions, defaultPimpOptions)) {
		const p = { ...defaultPimpOptions, ...pimpOptions };
		output += `?bg=${encodeURIComponent(p.bg)}&fg=${encodeURIComponent(
			p.fg
		)}&yl=${encodeURIComponent(p.yl)}&title=${encodeURIComponent(p.title)}&img=${encodeURIComponent(
			p.img
		)}&theme=${encodeURIComponent(p.theme)}`;
	}

	return output;
}
