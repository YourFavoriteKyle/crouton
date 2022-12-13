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

<div class="page-container">
	<Nav />
	<slot />
</div>

<style>
	:root {
		font-family: 'Nunito', sans-serif;
	}
	.page-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: var(--nord5);
	}
</style>
