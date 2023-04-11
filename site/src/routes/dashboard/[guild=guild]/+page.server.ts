import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { getGuild } from '$lib/server/discord';
import { BOT_TOKEN } from '$env/static/private';
import type { DiscordErrorData } from '@discordjs/rest';
import type { APIGuild } from 'discord-api-types/v10';

export const load = (async (event) => {
	const guild = await getGuild(BOT_TOKEN, event.params.guild);

	if ((guild as DiscordErrorData).code === 10004) {
		throw redirect(303, `/invite/?guild_id=${event.params.guild}`);
	}

	if ((guild as DiscordErrorData).code) {
		throw error(500, 'Something went wrong while getting your server data.');
	}

	return { guild: <APIGuild>guild };
}) satisfies PageServerLoad;
