export type WeekMatrix = (number | null)[];
export type MonthMatrix = Array<[ number, WeekMatrix ]>;
export type YearCalendar = Array<[ string, MonthMatrix ]>;
