import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = p => /^\d+$/.test(p);
