import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const load = (async (event) => {
	// Lock loading to the browser as supabase/auth-helpers seem to not set
	// cookies until a browser page loads
	// +page.ts files run both in browser and on server
	if (!browser) return;

	const { session } = await event.parent();

	const [pathname, slug] = [
		event.url.searchParams.get('pathname'),
		event.url.searchParams.get('slug')
	];

	if (pathname) {
		throw redirect(303, `/${pathname}${slug ? `/${slug}` : ''}`);
	}

	if (!session) {
		throw redirect(303, '/');
	}

	throw redirect(303, '/dashboard');
}) satisfies PageLoad;
