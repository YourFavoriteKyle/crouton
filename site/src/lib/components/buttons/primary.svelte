<script lang="ts">
	import { page } from '$app/stores';
	export let method: string | undefined = undefined;
	export let action: string | undefined = undefined;
	export let href: string | undefined = undefined;
</script>

{#if !method}
	<a {href} class:active={$page.url.pathname === href}>
		<div>
			<slot />
		</div>
	</a>
{:else}
	<form {method} {action}>
		<button>
			<div>
				<slot />
			</div>
		</button>
	</form>
{/if}

<style>
	:root {
		--color: var(--nord2);
		--hover-color: var(--nord2);
		--border-color: var(--nord2);
		--background-color: inherit;
		--hover-background-color: var(--nord5);
		--border-width: 0.1rem;
		--padding: 0.5rem 1rem;
	}
	div:hover {
		background-color: var(--hover-background-color);
		border-radius: 0.5rem;
		transition: 0.3s ease;
		color: var(--hover-color);
	}
	form {
		display: inline-block;
	}
	.active {
		border-bottom-width: 0.1rem;
	}
	div {
		display: inline-block;
		max-width: 30rem;
		width: fit-content;
		padding: var(--padding);
		transition: 0.3s ease;
		border-radius: 0.5rem;
		border-width: var(--border-width);
		background-color: var(--background-color);
		color: var(--color);
		border-color: var(--border-color);
	}
</style>
