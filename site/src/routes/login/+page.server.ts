import type { Actions, PageServerLoad } from './$types';
import { login } from '$lib/server/authHelpers';

export const actions = {
	default: async (event) => {
		await login(event, 'dashboard');
	}
} satisfies Actions;

export const load = (async (event) => {
	await login(event, 'dashboard', `${event.url.origin}/redirect`);
}) satisfies PageServerLoad;
