import type { PageServerLoad } from './$types';
import { getGuilds } from '$lib/server/discord';

export const load = (async ({ locals }) => {
	const userGuilds = await getGuilds(locals.providerData.access_token);

	userGuilds.sort((a, b) => {
		if (a.owner != b.owner) {
			return -1;
		} else if (a.permissions_flags?.ManageGuild != b.permissions_flags?.ManageGuild) {
			return -1;
		} else {
			return 1;
		}
	});
	return { userGuilds };
}) satisfies PageServerLoad;
