import { months } from '$lib/constants';
import { isInt } from '$lib/helpers';
import { yearCalendar } from '$lib/molecules/calendar/server';
import { lunarPhase } from '$lib/molecules/moon/helpers';
import type { RequestHandler } from './__types/index';

export const get: RequestHandler = async ({ params }) => {
	let date: Date;

	if (!(isInt(params.year) || isInt(params.month) || isInt(params.day)))
	return { status: 404 };

	if (params.day) {
		date = new Date(
			parseInt(params.year),
			months.indexOf(params.month),
			parseInt(params.day)
		);
	} else if (params.month) {
		date = new Date(parseInt(params.year), parseInt(params.month) - 1, 1);
	} else if (params.year) {
		date = new Date(
			parseInt(params.year),
			0, // Month is required, so default to January.
			1
		);
	} else return { status: 400 };

	let phases = [];

	new Array(7).fill('').forEach((_, i) => {
		const d = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate() + i + 1
		);

		phases.push({
			date: d,
			...lunarPhase(d),
		});
	});

	return {
		body: {
			date,
			phases,
			calendar: yearCalendar(date.getFullYear()),
		},
	};
}
