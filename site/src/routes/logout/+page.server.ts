import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { invalidate } from '$app/navigation';

export const load = (async (event) => {
	await event.locals.supabase.auth.signOut();
	event.cookies.delete('provider-data');
	invalidate('supabase:auth');
	throw redirect(303, '/');
}) satisfies PageServerLoad;
