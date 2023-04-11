import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		await event.locals.supabase.auth.signOut();
		event.cookies.delete('provider-data');
		throw redirect(303, '/');
	}
} satisfies Actions;
