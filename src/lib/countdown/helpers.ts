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

export function getPimpOptions(usp: URLSearchParams): PimpOptions {
	const get = (option: keyof PimpOptions) => {
		return usp.get(option) || '';
	};

	return {
		bg: get('bg'),
		fg: get('fg'),
		yl: get('yl'),
		img: get('img'),
		title: get('title')
	};
}
