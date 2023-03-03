import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getGuilds } from '$lib/server/discord';

export const load = (async (event) => {
	const session = await event.locals.getSession();

	if (!session || !session.provider_token) {
		throw redirect(303, '/login');
	}

	const userGuilds = await getGuilds(session?.provider_token);
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
