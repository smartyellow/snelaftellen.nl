import { assets } from '$app/paths';
import { months } from '$lib/constants';
import { areObjectsEqual } from '$lib/helpers';

export interface HeaderImage {
	id: string;
	title: string;
}

export const headerImages: HeaderImage[] = [
	{id: 'balloons', title: 'Ballonnen'},
	{id: 'christmas', title: 'Kerstmis'},
	{id: 'flags', title: 'Vlaggenlijn'},
	{id: 'inmemoriam', title: 'In memoriam'},
	{id: 'presents', title: 'Cadeautjes'},
	{id: 'pumpkin', title: 'Pompoen'},
	{id: 'vacation', title: 'Vakantie'}
];

export type HeaderImageId = typeof headerImages[number]['id'] | 'no';

export interface PimpOptions {
	bg?: string;
	fg?: string;
	yl?: string;
	img?: HeaderImageId;
	title?: string;
}

export const defaultPimpOptions: PimpOptions = {
	bg: '#ffffff',
	fg: '#000000',
	yl: '#f8f5c3',
	img: 'no',
	title: ''
};

export function getPimpOptions(usp: URLSearchParams): PimpOptions {
	const get = (option: keyof PimpOptions) => {
		return usp.get(option) || defaultPimpOptions[option];
	};

	return {
		bg: get('bg'),
		fg: get('fg'),
		yl: get('yl'),
		img: get('img'),
		title: get('title')
	};
}

export function getPimpBodyStyle(options: PimpOptions): string {
	const d = defaultPimpOptions;
	const o = options;

	return `
		<style>
			body {
				background-color: ${o.bg || d.bg};
				color: ${o.fg || d.fg};
				--yellow: ${o.yl || o.fg};
			}
		</style>
	`;
}

export function getPimpImagePath(img: string): string {
	return `${assets}/img/top/${img}.webp`;
}

export function getCountdownUrl(date: Date, pimpOptions = defaultPimpOptions): string {
	let output = `/${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`;

	if (!areObjectsEqual(pimpOptions, defaultPimpOptions)) {
		const p = {...defaultPimpOptions, ...pimpOptions};
		output += `?bg=${encodeURIComponent(
			p.bg
		)}&fg=${encodeURIComponent(p.fg)}&yl=${encodeURIComponent(p.yl)}&title=${encodeURIComponent(
			p.title
		)}&img=${encodeURIComponent(p.img)}`;
	}

	return output;
}
