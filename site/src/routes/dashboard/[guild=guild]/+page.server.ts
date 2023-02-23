import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { getGuild } from '$lib/server/discord';
import { BOT_TOKEN } from '$env/static/private';
import type { DiscordErrorData } from '@discordjs/rest';

export const load = (async (event) => {
	const { session } = await getSupabase(event);

	if (!session || !session.provider_token) {
		throw redirect(303, '/login');
	}

	const guild = await getGuild(BOT_TOKEN, event.params.guild);

	if ((guild as DiscordErrorData).code === 10004) {
		throw redirect(303, `/invite/?guild_id=${event.params.guild}`);
	}

	return { guild };
}) satisfies PageServerLoad;
