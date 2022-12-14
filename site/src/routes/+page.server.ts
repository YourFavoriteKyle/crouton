import type { Actions, RequestEvent } from './$types';
import { redirect, error as err } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

async function signIn(
	event: RequestEvent,
	scopes: string[],
	queryParams?: { [key: string]: string }
) {
	const { supabaseClient } = await getSupabase(event);
	const { data, error } = await supabaseClient.auth.signInWithOAuth({
		provider: 'discord',
		options: {
			scopes: scopes.join(' '),
			queryParams
		}
	});

	if (!error) {
		throw redirect(303, data.url);
	}

	throw err(500, 'Server error. Please try again later.');
}

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	signin: async (event) => {
		await signIn(event, ['identify', 'email', 'guilds']);
	},
	signout: async (event) => {
		const { supabaseClient } = await getSupabase(event);
		await supabaseClient.auth.signOut();

		throw redirect(303, '/');
	},
	invite: async (event) => {
		await signIn(event, ['identify', 'email', 'guilds', 'bot', 'applications.commands'], {
			permissions: '277025459200'
		});
	}
};
