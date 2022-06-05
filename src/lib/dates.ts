import { daysOfWeek } from "./constants";

export function difference(to: Date, now = new Date()): number {
	return Math.ceil(
		(to.getTime() - now.getTime())
		/ (1000 * 3600 * 24)
	);
}

export function getDayNumber(date: Date): number {
	const dayFromSunday = date.getDay();
	let output = dayFromSunday - 1;
	if (output === -1) output = 6;
	if (output < 0 || output > 6) return NaN;
	return output;
}

export function convertDayNumberFromMondayToSunday(day: number): number {
	let output = day + 1;
	if (output === 7) output = 0;
	if (output < 0 || output > 6) return NaN;
	return output;
}

export function convertDayNumberFromSundayToMonday(day: number): number {
	const map = {
		1: 0,
		2: 1,
		3: 2,
		4: 3,
		5: 4,
		6: 5,
		0: 6,
	};

	return typeof map[day] !== 'undefined' ? map[day] : NaN;
}

export function getWeekNumber(date: Date): number {
	// https://weeknumber.com/how-to/javascript

	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
	const weekOne = new Date(date.getFullYear(), 0, 4);
	return (
		1 +
		Math.round(
			((date.getTime() - weekOne.getTime()) / 86400000 - 3 + ((weekOne.getDay() + 6) % 7)) / 7
		)
	);
}

export function getDateFromWeekNumber(week: number, year: number): Date {
	// https://stackoverflow.com/a/16591175
	// https://stackoverflow.com/a/69948797

	const firstDayofYear = new Date(year, 0, 1);

	if (firstDayofYear.getDay() > 4) {
		const weekStart = new Date(year, 0, 1 + (week - 1) * 7 - firstDayofYear.getDay() + 9);
		//const weekEnd = new Date(year, 0, 1 + (week - 1) * 7 - firstDayofYear.getDay() + 8 + 5);
		return weekStart;
	} else {
		const weekStart = new Date(year, 0, 1 + (week - 1) * 7 - firstDayofYear.getDay() + 2);
		//const weekEnd = new Date(year, 0, 1 + (week - 1) * 7 - firstDayofYear.getDay() + 1 + 5);
		return weekStart;
	}
}

export function getDateFromDayWeekAndYear(day: number, week: number, year: number): Date {
	const weekStart = getDateFromWeekNumber(week, year);
	const date = new Date(weekStart.getDate() + day);
	return date;
}

export function numberOfDaysInMonth(month: number, year: number): number {
	return new Date(year, month, 0).getDate();
}

export function hasDatePassed(date: Date): boolean {
	const now = new Date();
	now.setHours(0, 0, 0, 0);
	return date.getTime() < now.getTime();
}

export function getMonday(d: Date): Date {
	// https://stackoverflow.com/a/4156516

	d = new Date(d);
	const day = d.getDay();
	const diff = d.getDate() - day + (day == 0 ? -6 : 1);
	return new Date(d.setDate(diff));
}

export function isDate(input: any): boolean {
	return input instanceof Date && !isNaN(input.getTime());
}

export function isDateValid(input: Date): boolean {
	return input.getTime() === input.getTime();
}

export function areDatesEqual(a: Date, b: Date): boolean {
	return a.getTime() - b.getTime() === 0;
}

export function julianDate(date: Date) {
	// https://jasonsturges.medium.com/moons-lunar-phase-in-javascript-a5219acbfe6e

	const time = date.getTime();
	const tzoffset = date.getTimezoneOffset()
	return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
}
