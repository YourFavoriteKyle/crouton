import type { LayoutServerLoad } from './$types';
import { VERCEL_ANALYTICS_ID } from '$env/static/private';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';

export const load = (async (event) => {
	return {
		vercelVitalsID: VERCEL_ANALYTICS_ID,
		session: await getServerSession(event)
	};
}) satisfies LayoutServerLoad;
