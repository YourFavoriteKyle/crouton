import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').LayoutLoad} */
export const load: LayoutLoad = async (event) => {
	const { session } = await getSupabase(event);
	return { session, vercelVitalsID: event.data.vercelVitalsID };
};
