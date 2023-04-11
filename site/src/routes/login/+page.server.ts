import type { PageServerLoad } from './$types';
import { login } from '$lib/server/authHelpers';

export const load = (async (event) => {
	await login(event, 'dashboard', { pathname: 'dashboard' });
}) satisfies PageServerLoad;
