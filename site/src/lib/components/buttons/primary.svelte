<script lang="ts">
	import { page } from '$app/stores';
	export let href: string | undefined = undefined;
	export let active = true;
	export let reload = false;
</script>

{#if reload}
	<a {href} data-sveltekit-reload class:active={$page.url.pathname === href && active}>
		<span>
			<slot />
		</span>
	</a>
{:else}
	<a {href} class:active={$page.url.pathname === href && active}>
		<span>
			<slot />
		</span>
	</a>
{/if}

<style>
	:root {
		--button-color: var(--nord2);
		--button-hover-color: var(--nord2);
		--button-border-color: var(--nord2);
		--button-bg-color: inherit;
		--button-hover-bg-color: var(--nord5);
		--button-border-width: 0.1rem;
		--button-padding: 0.5rem 1rem;
	}
	span:hover {
		background-color: var(--button-hover-bg-color);
		border-radius: 0.5rem;
		transition: 0.3s ease;
		color: var(--button-hover-color);
	}
	.active {
		border-bottom-width: 0.1rem;
	}
	span {
		display: inline-block;
		max-width: 30rem;
		width: fit-content;
		padding: var(--button-padding);
		transition: 0.3s ease;
		border-radius: 0.5rem;
		border-width: var(--button-border-width);
		background-color: var(--button-bg-color);
		color: var(--color);
		border-color: var(--button-border-color);
	}
</style>
