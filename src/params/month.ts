import { months } from '$lib/constants';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = p => months.includes(p);
