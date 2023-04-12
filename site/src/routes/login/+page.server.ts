import type { PageServerLoad } from './$types';
import { login } from '$lib/server/authHelpers';

export const load = (async (event) => {
	const internalRedirectTo = event.url.searchParams.get('internal_redirect_to');
	await login(event, 'dashboard', internalRedirectTo ? internalRedirectTo : undefined);
}) satisfies PageServerLoad;
