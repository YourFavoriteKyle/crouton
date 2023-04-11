import { redirect, error as err, type RequestEvent, type Cookies } from '@sveltejs/kit';
import { OAuth2Scopes } from 'discord-api-types/v10';
import type { PostgrestSingleResponse } from '@supabase/postgrest-js';
import type { Database } from '$lib/database';

type Scopes = 'dashboard' | 'invite' | undefined;

type RedirectTo = {
	pathname: string;
	slug?: string;
};

function checkScope(scope: Scopes | undefined): string | undefined {
	// We also require the 'identify' and 'email' scopes, but those are provided by default
	if (scope === 'dashboard') {
		return OAuth2Scopes.Guilds;
	}
	if (scope === 'invite') {
		return [OAuth2Scopes.Guilds, OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands].join(' ');
	}

	return undefined;
}

function redirectToString(event: RequestEvent, re?: RedirectTo): string {
	const baseString = `${event.url.origin}/redirect`;

	if (!re || !re.pathname) return baseString;

	if (!re.slug) return `${baseString}?pathname=${re.pathname}`;

	return `${baseString}?pathname=${re.pathname}&slug=${re.slug}`;
}

export async function login(
	event: RequestEvent,
	scope: Scopes = undefined,
	redirectTo?: RedirectTo,
	queryParams?: { [key: string]: string }
) {
	const { data, error } = await event.locals.supabase.auth.signInWithOAuth({
		provider: 'discord',
		options: {
			scopes: checkScope(scope),
			redirectTo: redirectToString(event, redirectTo),
			queryParams
		}
	});

	if (!error) {
		throw redirect(303, data.url);
	}

	throw err(500, 'Server error. Please try again later.');
}

/**
 *
 * @param event - The current SvelteKit RequestEvent
 * @returns SvelteKit Redirect on Errors for Unauthorized events
 * @returns provider_data from a cookie if available.
 * @returns provider_data from the database if no cookie is available.
 */
export async function getDBProviderData(event: RequestEvent) {
	const session = await event.locals.getSession();

	if (!session) {
		return redirect(303, '/');
	}

	const providerData = event.cookies.get('provider-data');
	if (providerData) {
		return <Database['public']['Tables']['provider_data']['Row']>JSON.parse(providerData);
	}

	const dbSelectProviderData: PostgrestSingleResponse<
		Database['public']['Tables']['provider_data']['Row']
	> = await event.locals.supabase.from('provider_data').select().limit(1).single();

	if (dbSelectProviderData.error) {
		return err(500, 'Something went wrong while loading user data.');
	}

	if (!dbSelectProviderData.data.access_token) {
		return redirect(303, '/');
	}

	return dbSelectProviderData.data;
}

export function setProviderCookieAndLocals(
	cookies: Cookies,
	locals: App.Locals,
	providerData: App.Locals['providerData']
) {
	// TODO: Sign tokens
	cookies.set(
		'provider-data',
		JSON.stringify({
			access_token: providerData.access_token,
			expires_at: providerData.expires_at
		}),
		{
			secure: true,
			sameSite: false,
			path: '/',
			expires: new Date(providerData.expires_at)
		}
	);

	locals.providerData = {
		access_token: providerData.access_token,
		expires_at: providerData.expires_at
	};
}
