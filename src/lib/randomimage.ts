import { readdirSync } from 'fs';
import { join } from 'path';

export function randomImage(theme: string, absolutePath = true): string {
	const images = readdirSync(join('static/s/img/home', theme));
	const image = images[Math.floor(Math.random() * images.length)];

	if (absolutePath) {
		return `/s/img/home/${theme}/${image}`;
	} else {
		return image;
	}
}
