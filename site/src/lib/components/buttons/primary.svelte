<script lang="ts">
	interface HREF {
		link: string;
		alt: string;
	}
	export let method: string | undefined = undefined;
	export let action: string | undefined = undefined;
	export let href: HREF | undefined = undefined;
</script>

<div>
	{#if !method}
		<a href={href?.link} alt={href?.alt}>
			<slot />
		</a>
	{:else}
		<form {method} {action}>
			<button>
				<slot />
			</button>
		</form>
	{/if}
</div>

<style>
	:root {
		--color: var(--nord2);
		--border-color: var(--color);
		--background-color: inherit;
		--hover-background-color: var(--nord5);
		--border-width: 01rem;
	}
	div:hover {
		background-color: var(--hover-background-color);
		border-radius: 0.5rem;
		transition: 0.3s ease;
	}
	div {
		display: inline-block;
		max-width: 30rem;
		width: fit-content;
		padding: 0.5rem 1rem;
		transition: 0.3s ease;
		border-radius: 0.5rem;
		border-width: --border-width;
		background-color: var(--background-color);
		color: var(--color);
		border-color: var(--border-color);
	}
	@media (max-width: 768px) {
		div {
			margin: 0.75rem 0 0 0;
		}
	}
</style>
