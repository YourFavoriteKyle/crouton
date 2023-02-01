import type { LayoutServerLoad } from './$types';
import { VITE_VERCEL_ANALYTICS_ID } from '$env/static/private';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').LayoutServerLoad} */
export const load: LayoutServerLoad = async (event) => {
	return {
		vercelVitalsID: VITE_VERCEL_ANALYTICS_ID,
		session: await getServerSession(event)
	};
};
