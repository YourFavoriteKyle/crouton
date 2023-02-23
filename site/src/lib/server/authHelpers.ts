import type { RequestEvent, LoadEvent, ServerLoadEvent } from '@sveltejs/kit';
import { redirect, error as err } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { OAuth2Scopes } from 'discord-api-types/payloads/v10';

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

function redirectToString(
	event: RequestEvent | LoadEvent | ServerLoadEvent,
	re?: RedirectTo
): string {
	const baseString = `${event.url.origin}/redirect`;

	if (!re || !re.pathname) return baseString;

	if (!re.slug) return `${baseString}?pathname=${re.pathname}`;

	return `${baseString}?pathname=${re.pathname}&slug=${re.slug}`;
}

export async function login(
	event: RequestEvent | LoadEvent | ServerLoadEvent,
	scope: Scopes = undefined,
	redirectTo?: RedirectTo,
	queryParams?: { [key: string]: string }
) {
	const { supabaseClient } = await getSupabase(event);
	const { data, error } = await supabaseClient.auth.signInWithOAuth({
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
