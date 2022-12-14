import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').LayoutServerLoad} */
export const load: LayoutServerLoad = async (event) => {
	return {
		session: await getServerSession(event)
	};
};
