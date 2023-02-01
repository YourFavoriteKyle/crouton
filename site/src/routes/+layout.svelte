<script lang="ts">
	import type { LayoutServerData } from './$types';
	import '../app.css';
	import { supabase } from '$lib/db';
	import { browser, dev } from '$app/environment';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/nav/nav.svelte';
	import Footer from '$lib/components/footer.svelte';

	export let data: LayoutServerData;

	onMount(async () => {
		if (browser && !dev) {
			const webVitals = (await import('$lib/vitals')).webVitals;
			webVitals({
				path: $page.url.pathname,
				params: $page.params,
				analyticsId: data.vercelVitalsID,
				debug: false
			});
		}

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="layout">
	<Nav />
	<div class="content">
		<slot />
	</div>
	<Footer />
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: 0;
	}
	.content {
		padding: 5rem 0;
		flex: 1;
	}
</style>
