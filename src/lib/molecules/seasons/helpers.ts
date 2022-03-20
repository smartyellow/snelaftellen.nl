import autumnIcon from '$lib/gfx/seasons/autumn.webp?h=100&w=100&img';
import springIcon from '$lib/gfx/seasons/spring.webp?h=100&w=100&img';
import summerIcon from '$lib/gfx/seasons/summer.webp?h=100&w=100&img';
import winterIcon from '$lib/gfx/seasons/winter.webp?h=100&w=100&img';

export type Season = [
	/* 0 */ name: string,
	/* 1 */ img: string,
	/* 2 */ wikipedia: string,
	/* 3 */ start: Date,
	/* 4 */ end: Date
];

const y = new Date().getFullYear();

export const seasons: {
	[key: string]: Season
} = {
	spring: ['lente', springIcon, '', new Date(y, 2), new Date(y, 4, 31)],
	summer: ['zomer', summerIcon, '', new Date(y, 5), new Date(y, 7, 31)],
	autumn: ['herfst', autumnIcon, '', new Date(y, 8), new Date(y, 10, 30)],
	winter: ['winter', winterIcon, '', new Date(y, 11), new Date(y, 1, 28)]
};

export const seasonNames = Object.keys(seasons).map(s => seasons[s][0]);

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
