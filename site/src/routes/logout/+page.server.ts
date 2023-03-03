import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		await event.locals.supabase.auth.signOut();
		throw redirect(303, '/');
	}
} satisfies Actions;
