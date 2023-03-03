import type { LayoutServerLoad } from './$types';
import { VERCEL_ANALYTICS_ID } from '$env/static/private';

export const load = (async (event) => {
	return {
		vercelVitalsID: VERCEL_ANALYTICS_ID,
		session: await event.locals.getSession()
	};
}) satisfies LayoutServerLoad;
