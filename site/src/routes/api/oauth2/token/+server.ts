import { setProviderCookieAndLocals } from '$lib/server/authHelpers';
import { redirect, type RequestHandler } from '@sveltejs/kit';
import { upsertDBProviderData } from './upsert';
import type { Database } from '$lib/database';

export const GET = (async (event) => {
	const session = await event.locals.getSession();

	if (!session || !session.provider_token || !session.provider_refresh_token) {
		throw redirect(303, '/');
	}

	const tokenInfo = await (
		await event.fetch(`/api/oauth2/@me?userToken=${session.provider_token}`, {
			method: 'GET'
		})
	).json();

	const auth: Omit<Database['public']['Tables']['provider_data']['Row'], 'id' | 'created_at'> = {
		access_token: session.provider_token,
		refresh_token: session.provider_refresh_token,
		expires_at: tokenInfo.expires,
		scopes: tokenInfo.scopes.join(','),
		token_type: 'Bearer'
	};

	const dbUpsert = await upsertDBProviderData(event, { ...auth });

	if (!(dbUpsert instanceof Response)) {
		throw dbUpsert;
	}

	setProviderCookieAndLocals(event.cookies, event.locals, { ...auth });

	return dbUpsert;
}) satisfies RequestHandler;
