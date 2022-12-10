import { CLIENT_SECRET, CLIENT_ID } from '$env/static/private';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }: any) {
	const code = url.searchParams.get('code');

	if (code) {
		try {
			const tokenResponseData = await fetch('https://discord.com/api/v10/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: CLIENT_ID,
					client_secret: CLIENT_SECRET,
					code: code,
					grant_type: 'authorization_code',
					redirect_uri: `${url.origin}${url.pathname}`
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});

			const oauthData = await tokenResponseData.json();

			const userResult = await fetch('https://discord.com/api/v10/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`
				}
			});

			const userData = await userResult.json();

			return userData;
		} catch (err) {
			// NOTE: Unauthorized tokens do not throw errors!
			// tokenResponseData.statusCode expected to be 401
			console.error(err);
		}
	}

	throw error(500, 'Internal Error');
}
