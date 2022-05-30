export type Season = [
	/* 0 */ name: string,
	/* 1 */ img: string,
	/* 2 */ wikipedia: string,
	/* 3 */ start: Date,
	/* 4 */ end: Date
];

const y = new Date().getFullYear();

export const seasons: {
	[key: string]: Season;
} = {
	spring: [
		'lente',
		'/img/seasons/spring.webp',
		'https://nl.wikipedia.org/wiki/Lente',
		new Date(y, 2),
		new Date(y, 4, 31)
	],
	summer: [
		'zomer',
		'/img/seasons/summer.webp',
		'https://nl.wikipedia.org/wiki/Zomer',
		new Date(y, 5),
		new Date(y, 7, 31)
	],
	autumn: [
		'herfst',
		'/img/seasons/autumn.webp',
		'https://nl.wikipedia.org/wiki/Herfst',
		new Date(y, 8),
		new Date(y, 10, 30)
	],
	winter: [
		'winter',
		'/img/seasons/winter.webp',
		'https://nl.wikipedia.org/wiki/Winter',
		new Date(y, 11),
		new Date(y, 1, 28)
	]
};

export const seasonNames = Object.keys(seasons).map((s) => seasons[s][0]);

export function getSeason(d: Date): Season {
	const month = d.getMonth();
	let season: Season;

	// https://gist.github.com/jossef/d904cd0838304b0e6c01
	if (3 <= month && month <= 5) {
		season = seasons.spring;
	} else if (6 <= month && month <= 8) {
		season = seasons.summer;
	} else if (9 <= month && month <= 11) {
		season = seasons.autumn;
	} else {
		// Months 12, 01, 02
		season = seasons.winter;
	}

	return season;
}
