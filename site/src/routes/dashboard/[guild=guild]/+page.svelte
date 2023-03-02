<script lang="ts">
	import type { PageData } from './$types';
	import Boost from './boost.svelte';
	import Header from './header.svelte';

	export let data: PageData;
	const guild = data.guild;
</script>

<svelte:head>
	<title>{guild.name} - Crouton Bot</title>
</svelte:head>

<div class="container">
	<Header {guild} />
	<Boost {guild} />
</div>

<style>
	.container {
		display: block;
		width: 100%;
		padding: 1rem 2rem;
		border-radius: 0.25rem;

		background-color: var(--nord6);
	}
</style>
