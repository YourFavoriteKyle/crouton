<script lang="ts">
	import type { LayoutServerData } from './$types';
	import '../app.css';
	import { browser, dev } from '$app/environment';
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
	});
</script>

<svelte:head>
	<title>Charcuterie Board of Discord Bots - Crouton Bot</title>
	<meta name="application-name" content="Crouton Bot" />
	<meta name="author" content="Crouton Bot" />
	<meta
		name="description"
		content="Crouton is a fantastic Discord bot that provides a unique way of managing your server. Invite Crouton today and empower your server!"
	/>
</svelte:head>

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
		padding: 6rem 0;
		flex: 1;
	}
</style>
