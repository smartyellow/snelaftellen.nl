import { countdownOptions } from '$lib/constants';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = p => countdownOptions.includes(p);
