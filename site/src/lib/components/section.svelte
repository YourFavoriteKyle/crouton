<script lang="ts">
	export let half = false;
</script>

<section>
	<div class="container {half ? 'row' : 'column'}">
		<slot />
	</div>
</section>

<style>
	:root {
		--section-bg-color: inherit;
		--section-text-align: inherit;
	}
	section {
		background-color: var(--section-bg-color);
		text-align: var(--section-text-align);
		min-height: 25rem;
		display: flex;
		align-items: center;
	}
	.container {
		padding: 1rem 2rem;
	}
	.column {
		flex-direction: column;
	}
	.row {
		flex-direction: row;
	}
	@media (max-width: 1000px) {
		.container {
			flex-direction: column;
		}
	}
</style>
