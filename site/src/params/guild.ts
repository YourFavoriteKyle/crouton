import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return /^\b\d+\b$/gm.test(param);
}) satisfies ParamMatcher;
