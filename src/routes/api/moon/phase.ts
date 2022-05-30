import { lunarAge, lunarAgePercentage, lunarPhase } from '$lib/molecules/moon/helpers';
import type { RequestHandler } from './__types/phase';

export const get: RequestHandler = async ({ url }) => {
	const d = Number(url.searchParams.get('d')) || NaN;
	const m = Number(url.searchParams.get('m')) || NaN;
	const y = Number(url.searchParams.get('y')) || NaN;
	const size = Number(url.searchParams.get('size')) || 1;

	if (isNaN(d) || isNaN(m) || isNaN(y)) return {
		status: 400,
		body: {
			err: 'At least one of the d,m,y params is not a number.',
			input: { d, m, y, size },
		},
	};

	const results = [];

	new Array(size).fill('').forEach((_, i) => {
		const date = new Date(y, m - 1, d + i + 1);
		const percentage = lunarAgePercentage(date);
		const age = lunarAge(percentage);
		const phase = lunarPhase(age);

		results.push({
			date, phase, age,
			percentage: percentage * 100,
		});
	});

	return { body: results };
}
