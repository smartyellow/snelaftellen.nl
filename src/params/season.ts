import { seasonNames } from '$lib/molecules/seasons/helpers';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = p => seasonNames.includes(p);
