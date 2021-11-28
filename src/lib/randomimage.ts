import { readdirSync } from 'fs';
import { join } from 'path';
import { dev } from '$app/env';

export function randomImage(theme: string, absolutePath = true): string {
	const base = dev ? 'static/s/img/home' : 'build/s/img/home';
	const images = readdirSync(join(base, theme));
	const image = images[Math.floor(Math.random() * images.length)];

	if (absolutePath) {
		return `/s/img/home/${theme}/${image}`;
	} else {
		return image;
	}
}
