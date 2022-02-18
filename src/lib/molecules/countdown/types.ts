import type { headerImages } from "./helpers";

export interface HeaderImage {
	id: string;
	title: string;
}

export type HeaderImageId = typeof headerImages[number]['id'] | 'no';

export interface PimpOptions {
	bg?: string;
	fg?: string;
	yl?: string;
	img?: HeaderImageId;
	title?: string;
}

export interface PimpedCalendar {
	pimpOptions: PimpOptions;
	date: Date;
}
