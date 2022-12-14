<script lang="ts">
	import { supabase } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/nav/nav.svelte';

	onMount(() => {
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

<Nav />
<slot />

<style>
	:root {
		font-family: 'Nunito', sans-serif;
		font-weight: 300;
		--page-padding: 15%;
		color: var(--nord2);
		max-width: 100rem;
		margin: 0 auto;
	}
</style>
