import { type RESTAPIPartialCurrentUserGuild, type APIGuild, Routes } from 'discord-api-types/v10';
import { DiscordAPIError, REST, type DiscordErrorData } from '@discordjs/rest';
import { type PermissionFlagsBits, PermissionsBitField } from 'discord.js';

export const rest = (() => {
	const rest = new REST({ version: '10' });

	return rest;
})();

interface RESTAPIPartialCurrentUserGuildPermissions extends RESTAPIPartialCurrentUserGuild {
	permissions_flags?: Record<keyof typeof PermissionFlagsBits, boolean>;
}

function parsePermissions(
	guild: RESTAPIPartialCurrentUserGuildPermissions
): RESTAPIPartialCurrentUserGuildPermissions {
	const perms = new PermissionsBitField(BigInt(guild.permissions));
	perms.freeze();
	guild.permissions_flags = perms.serialize();

	return guild;
}

export async function getGuilds(
	token: string
): Promise<RESTAPIPartialCurrentUserGuildPermissions[]> {
	rest.setToken(token);

	const guilds = (await rest.get(Routes.userGuilds(), {
		authPrefix: 'Bearer'
	})) as RESTAPIPartialCurrentUserGuild[];

	return guilds.map(parsePermissions);
}

export async function getGuild(
	token: string,
	guildId: string
): Promise<APIGuild | DiscordErrorData> {
	const params = new URLSearchParams({ with_counts: 'true' });
	rest.setToken(token);

	// NOTE: We use a try catch here since @discordjs/rest throws an error without returning any information.
	// There is probably a better way, but this works for now...
	try {
		return (await rest.get(Routes.guild(guildId), { query: params })) as APIGuild;
	} catch (error) {
		return (error as DiscordAPIError).rawError as DiscordErrorData;
	}
}
