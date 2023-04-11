import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return /\w/gm.test(param);
}) satisfies ParamMatcher;
