import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async (event) => {
	await event.locals.supabase.auth.signOut();
	event.cookies.delete('provider-data');
	throw redirect(303, '/');
}) satisfies PageServerLoad;
