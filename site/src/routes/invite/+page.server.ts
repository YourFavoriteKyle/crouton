import type { PageServerLoad } from './$types';
import { login } from '$lib/server/authHelpers';

export const load = (async (event) => {
	const guild_id = event.url.searchParams.get('guild_id');
	if (guild_id) {
		await login(event, 'invite', `/dashboard/${guild_id}`, {
			permissions: '277025459200',
			guild_id,
			disable_guild_select: 'true'
		});
	}
	await login(event, 'invite', undefined, { permissions: '277025459200' });
}) satisfies PageServerLoad;
