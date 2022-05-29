import { continentsLowercase } from "$lib/molecules/timezones/helpers";
import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = p =>
	continentsLowercase.includes(p.toLowerCase());
