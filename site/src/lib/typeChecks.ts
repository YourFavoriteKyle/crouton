import type { Redirect, HttpError } from '@sveltejs/kit';
import type { Database } from '$lib/database';
import type { RESTPostOAuth2AccessTokenResult } from 'discord-api-types/v10';
import type { DiscordErrorData } from 'discord.js';

export function isDiscordError(
	error: RESTPostOAuth2AccessTokenResult | DiscordErrorData
): error is DiscordErrorData {
	return 'error' in error;
}

export function isDBProviderData(
	data: Database['public']['Tables']['provider_data']['Row'] | Redirect | HttpError
): data is Database['public']['Tables']['provider_data']['Row'] {
	return 'access_token' in data;
}
