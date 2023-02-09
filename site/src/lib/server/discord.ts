import { type RESTAPIPartialCurrentUserGuild, Routes } from 'discord-api-types/v10';
import { REST } from '@discordjs/rest';
import { type PermissionFlagsBits, PermissionsBitField } from 'discord.js';

interface RESTAPIPartialCurrentUserGuildPermissions extends RESTAPIPartialCurrentUserGuild {
	permissions_flags?: Record<keyof typeof PermissionFlagsBits, boolean>;
}

export async function getGuilds(
	token: string,
	user = true
): Promise<RESTAPIPartialCurrentUserGuildPermissions[]> {
	const rest = new REST({ authPrefix: user ? 'Bearer' : 'Bot', version: '10' }).setToken(token);

	return ((await rest.get(Routes.userGuilds())) as RESTAPIPartialCurrentUserGuild[]).map(
		(guild: RESTAPIPartialCurrentUserGuildPermissions) => {
			const perms = new PermissionsBitField(BigInt(guild.permissions));
			perms.freeze();
			guild.permissions_flags = perms.serialize();
			return guild;
		}
	);
}
