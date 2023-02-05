import type { Actions, PageServerLoad } from './$types';
import { login } from '$lib/server/authHelpers';

export const actions = {
	default: async (event) => {
		await login(event, 'invite', undefined, { permissions: '277025459200' });
	}
} satisfies Actions;

export const load = (async (event) => {
	await login(event, 'invite', undefined, { permissions: '277025459200' });
}) satisfies PageServerLoad;
