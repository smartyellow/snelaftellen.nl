import iconCre from '$lib/gfx/moon/cre.webp?h=90&w=90&img';
import iconFul from '$lib/gfx/moon/ful.webp?h=90&w=90&img';
import iconGib from '$lib/gfx/moon/gib.webp?h=90&w=90&img';
import iconNew from '$lib/gfx/moon/new.webp?h=90&w=90&img';
import iconQua from '$lib/gfx/moon/qua.webp?h=90&w=90&img';

export type MoonPhase =
	'New'
	| 'Waxing Crescent'
	| 'First Quarter'
	| 'Waxing Gibbous'
	| 'Full'
	| 'Waning Gibbous'
	| 'Last Quarter'
	| 'Waning Crescent';

export const moonPhases: {
	[key in MoonPhase]: [
		/* 0 */ name: string,
		/* 1 */ img: string,
		/* 2 */ viceversa: boolean,
		/* 3 */ wikipedia: string
	]
} = {
	'New': ['Nieuwe maan', iconNew, false, 'https://nl.wikipedia.org/wiki/Nieuwe_maan'],
	'Waxing Crescent': ['Wassende maan (sikkel)', iconCre, false, 'https://nl.wikipedia.org/wiki/Wassende_en_afnemende_maan'],
	'First Quarter': ['Eerste kwartier', iconQua, false, 'https://nl.wikipedia.org/wiki/Eerste_kwartier'],
	'Waxing Gibbous': ['Wassende maan', iconGib, false, 'https://nl.wikipedia.org/wiki/Wassende_en_afnemende_maan'],
	'Full': ['Volle maan', iconFul, false, 'https://nl.wikipedia.org/wiki/Volle_maan_(astronomie)'],
	'Waning Gibbous': ['Afnemende maan', iconGib, true, 'https://nl.wikipedia.org/wiki/Wassende_en_afnemende_maan'],
	'Last Quarter': ['Laatste kwartier', iconQua, true, 'https://nl.wikipedia.org/wiki/Laatste_kwartier'],
	'Waning Crescent': ['Afnemende maan (sikkel)', iconCre, true, 'https://nl.wikipedia.org/wiki/Wassende_en_afnemende_maan'],
};
