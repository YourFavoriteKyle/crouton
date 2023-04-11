import type { Database } from '$lib/database';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

/**
 *
 * @param event - The current SvelteKit RequestEvent
 * @param providerData - The provider data to update or insert
 * @returns SvelteKit Redirect on Errors for Unauthorized events
 * @returns an empty status: 200 Response
 */
export async function upsertDBProviderData(
	event: RequestEvent,
	providerData: Omit<Database['public']['Tables']['provider_data']['Row'], 'id' | 'created_at'>
) {
	const session = await event.locals.getSession();
	const supabase = event.locals.supabase;

	if (!session || !session.provider_token || !session.provider_refresh_token) {
		return redirect(303, '/');
	}

	const dbUpsert = await supabase.from('provider_data').upsert(
		{ ...providerData, id: session.user.id },
		{
			ignoreDuplicates: false,
			onConflict: 'id',
			count: 'planned'
		}
	);

	if (dbUpsert.error) {
		return error(500, 'An unexpected error occurred during user data update');
	}

	return new Response(null, { status: 200 });
}
