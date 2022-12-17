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
