import { error, type RequestHandler } from '@sveltejs/kit';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { rest } from '$lib/server/discord';
import { Routes, type RESTPostOAuth2AccessTokenResult } from 'discord-api-types/v10';
import type { DiscordAPIError, DiscordErrorData } from 'discord.js';
import { getDBProviderData, setProviderCookieAndLocals } from '$lib/server/authHelpers';
import { upsertDBProviderData } from '../upsert';
import { isDiscordError, isDBProviderData } from '$lib/typeChecks';
import type { Database } from '$lib/database';

async function refreshTokenInfo(userToken: string, refreshToken: string) {
	rest.setToken(userToken);

	const params = new URLSearchParams({
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: 'refresh_token',
		refresh_token: refreshToken
	});

	try {
		return (await rest.post(Routes.oauth2TokenExchange(), {
			authPrefix: 'Bearer',
			query: params
		})) as RESTPostOAuth2AccessTokenResult;
	} catch (error) {
		return (error as DiscordAPIError).rawError as DiscordErrorData;
	}
}

export const GET = (async (event) => {
	const providerData = await getDBProviderData(event);

	// Passes auth checking and error checking results into the RequestHandler
	if (!isDBProviderData(providerData)) {
		throw providerData;
	}

	const refreshResponse = await refreshTokenInfo(
		providerData.access_token,
		providerData.refresh_token
	);

	if (isDiscordError(refreshResponse)) {
		throw error(500, 'An unexpected error occurred while refreshing token');
	}

	const convertedAuth: Omit<
		Database['public']['Tables']['provider_data']['Row'],
		'id' | 'created_at'
	> = {
		access_token: refreshResponse.access_token,
		refresh_token: refreshResponse.refresh_token,
		token_type: refreshResponse.token_type,
		scopes: refreshResponse.scope,
		expires_at: new Date(refreshResponse.expires_in + new Date().getTime()).toISOString()
	};

	const dbUpsert = await upsertDBProviderData(event, convertedAuth);

	setProviderCookieAndLocals(event.cookies, event.locals, { ...convertedAuth });

	if (!(dbUpsert instanceof Response)) {
		throw dbUpsert;
	}

	return dbUpsert;
}) satisfies RequestHandler;
