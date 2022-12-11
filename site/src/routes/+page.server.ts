import type { Actions } from './$types';
import { redirect, error as err } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	signin: async (event) => {
		const { supabaseClient } = await getSupabase(event);
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				scopes: 'identify email guilds'
			}
		});

		if (!error) {
			throw redirect(303, data.url);
		}

		throw err(500, 'Server error. Please try again later.');
	},
	signout: async (event) => {
		const { supabaseClient } = await getSupabase(event);
		await supabaseClient.auth.signOut();

		throw redirect(303, '/');
	}
};
