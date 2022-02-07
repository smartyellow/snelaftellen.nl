export interface PimpOptions {
	bg?: string;
	fg?: string;
	yl?: string;
	img?: string;
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
