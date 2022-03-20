import { countdownOptions } from "$lib/constants";
import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = p => {
	return countdownOptions.includes(p);
}
