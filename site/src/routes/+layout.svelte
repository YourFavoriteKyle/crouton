<script lang="ts">
	import '../app.css';
	import { supabase } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/nav/nav.svelte';
	import Footer from '$lib/components/footer.svelte';

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

<div class="container">
	<Nav />
	<div class="content">
		<slot />
	</div>
	<Footer />
</div>

<style>
	:root {
		--page-padding: 15%;
		font-family: 'Nunito', sans-serif;
		font-weight: 300;
		color: var(--nord2);
		max-width: 100rem;
		margin: 0 auto;
	}
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: 0;
	}
	.content {
		padding: 0rem var(--page-padding);
		flex: 1;
	}
</style>
