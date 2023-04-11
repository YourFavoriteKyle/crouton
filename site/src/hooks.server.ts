import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import { getDBProviderData, setProviderCookieAndLocals } from '$lib/server/authHelpers';
import { isDBProviderData } from '$lib/typeChecks';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	const protectedRoutes = ['/dashboard'];

	// TODO: Need to check if the token needs refreshed based on the providerData.expires_at value

	for (const route of protectedRoutes) {
		if (event.url.pathname.startsWith(route)) {
			/**
			 * Session check is done during getDBProviderData
			 */
			const providerData = await getDBProviderData(event);

			// Passes auth checking and error checking results into the RequestHandler
			if (!isDBProviderData(providerData)) {
				throw providerData;
			}

			setProviderCookieAndLocals(event.cookies, event.locals, { ...providerData });
		}
	}

	return resolve(event, {
		/**
		 * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
		 *
		 * https://github.com/sveltejs/kit/issues/8061
		 */
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
