export function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isInt(input: string | number): boolean {
	let value: string;
	if (typeof input === 'number') value = ` ${input} `;
	else value = input;
	return Number.isInteger(parseInt(value));
}

export function isDateValid(input: Date): boolean {
	return input.getTime() === input.getTime();
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

export function getWeekNumber(date: Date): number {
	// https://weeknumber.com/how-to/javascript

	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	const weekOne = new Date(date.getFullYear(), 0, 4);
	return 1 + Math.round(((date.getTime() - weekOne.getTime()) / 86400000 - 3 + (weekOne.getDay() + 6) % 7) / 7);
}

export function getDateFromWeekNumber(week: number, year: number): Date {
	// https://stackoverflow.com/a/16591175
	// https://stackoverflow.com/a/69948797

	const firstDayofYear = new Date(year, 0, 1);

    if (firstDayofYear.getDay() > 4)  {
        const weekStart = new Date(year, 0, 1 + (week - 1) * 7 - firstDayofYear.getDay() + 9);
        //const weekEnd = new Date(year, 0, 1 + (week - 1) * 7 - firstDayofYear.getDay() + 8 + 5);
        return weekStart
    }
    else {
        const weekStart = new Date(year, 0, 1 + (week - 1) * 7 - firstDayofYear.getDay() + 2);
        //const weekEnd = new Date(year, 0, 1 + (week - 1) * 7 - firstDayofYear.getDay() + 1 + 5);
        return weekStart
    }
}

export function getDateFromDayWeekAndYear(day: number, week: number, year: number): Date {
	const weekStart = getDateFromWeekNumber(week, year);
	const date = new Date(weekStart.getDate() + day);
	return date;
}
