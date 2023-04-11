import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { rest } from '$lib/server/discord';
import { Routes, type RESTGetAPIOAuth2CurrentAuthorizationResult } from 'discord-api-types/v10';

async function getTokenInfo(userToken: string) {
	rest.setToken(userToken);

	return (await rest.get(Routes.oauth2CurrentAuthorization(), {
		authPrefix: 'Bearer'
	})) as RESTGetAPIOAuth2CurrentAuthorizationResult;
}

export const GET = (async ({ url }) => {
	const userToken = url.searchParams.get('userToken');

	if (!userToken) {
		throw error(400, 'A user token is required.');
	}

	const currentAuth = await getTokenInfo(userToken);

	return json(currentAuth);
}) satisfies RequestHandler;
