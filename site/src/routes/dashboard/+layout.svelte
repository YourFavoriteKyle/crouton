<script type="ts">
	import { createOAuthExpiration } from '$lib/stores/oauthRefresh';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(async () => {
		const oauthExpiration = createOAuthExpiration(data.providerData.expires_at);

		oauthExpiration.subscribe(async (val) => {
			if (val < 300) {
				await fetch('/api/oauth2/token/refresh', {
					method: 'GET'
				});
			}
		});
	});
</script>

<slot />
