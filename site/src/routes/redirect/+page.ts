import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const load = (async (event) => {
	// Lock loading to the browser as supabase/auth-helpers seem to not set
	// +page.ts files run both in browser and on server
	if (!browser) return;

	const { session } = await event.parent();

	if (!session) {
		throw redirect(303, '/');
	}

	const tokenResponse = await event.fetch(`/api/oauth2/token`, {
		method: 'GET'
	});

	if (!(tokenResponse instanceof Response)) {
		throw tokenResponse;
	}

	const internalRedirectTo = event.url.searchParams.get('internal_redirect_to');

	if (internalRedirectTo) {
		throw redirect(303, `${internalRedirectTo}`);
	}

	throw redirect(303, '/dashboard');
}) satisfies PageLoad;
