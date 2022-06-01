import { continentsLowercase } from "$lib/molecules/timezones/data";
import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = p =>
	continentsLowercase.includes(p.toLowerCase());
