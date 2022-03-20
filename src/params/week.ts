import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = p => {
	const n = Number(p);

	return (
		/^\d+$/.test(p) &&
		n >= 1 &&
		n <= 52
	);
}
