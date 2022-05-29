import { placesLowercase } from "$lib/molecules/timezones/helpers";
import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = p =>
	placesLowercase.includes(p.toLowerCase());
