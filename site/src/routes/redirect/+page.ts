import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { session } = await event.parent();
	return { session };
}) satisfies PageLoad;
