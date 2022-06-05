import { monthsEn } from '$lib/constants';
import { getDayNumber, getWeekNumber, numberOfDaysInMonth } from '$lib/dates';
import { areArraysEqual } from '$lib/helpers';
import type { MonthMatrix, YearCalendar } from './helpers';

function monthMatrix(
	monthNum: number,
	year: number,
	startOffset: number
): MonthMatrix {
	let out = [];
	let currentDate = 1;
	let numberOfDays = numberOfDaysInMonth(monthNum + 1, year);

	// each week of this month
	new Array(6).fill('').map((_, iWeek) => {
		const outWeek = [];

		// each day of this week
		new Array(7).fill('').map((_, iDay) => {
			if (
				(iWeek === 0 && iDay < startOffset)
				|| (currentDate > numberOfDays)
			) outWeek.push(null);
			else {
				outWeek.push(currentDate);
				currentDate++;
			}
		});

		if (areArraysEqual(outWeek, new Array(7).fill(null))) out.push([]);
		else out.push(outWeek);
	});

	return out;
}

export function yearCalendar(year: number): YearCalendar {
	const calendar = [];
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	for (const [ monthNum ] of monthsEn.entries()) {
		const monthAbbr = monthsEn[monthNum].toLowerCase().slice(0, 3)
		const startDate = new Date(year, monthNum, 1);
		const startOffset = getDayNumber(startDate);
		const weekNumOffset = getWeekNumber(startDate); // === 52 ? 0 : getWeekNumber(startDate)
		const matrix = monthMatrix(monthNum, year, startOffset);
		const monthCalendar = [];

		for (let [ weekNum, weekDates ] of matrix.entries()) {
			weekNum = weekNum + weekNumOffset > 52 ? weekNum : weekNum + weekNumOffset;
			weekNum = weekNum === 0 ? 52 : weekNum;
			monthCalendar.push([ weekNum, weekDates ]);
		}

		calendar.push([ monthAbbr, monthCalendar ]);
	}

	return calendar;
}
