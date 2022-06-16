import { idsLowercase } from '$lib/molecules/time/timezones/data';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = p =>
	idsLowercase.includes(p.toLowerCase());
