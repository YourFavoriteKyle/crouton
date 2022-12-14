<script lang="ts">
	export let half = false;
</script>

<section class:half>
	<slot />
</section>

<style>
	section:first-of-type {
		padding: 5rem var(--page-padding) 2.5rem var(--page-padding);
	}
	section:last-of-type {
		padding: 2.5rem var(--page-padding) 5rem var(--page-padding);
	}
	section {
		padding: 2.5rem var(--page-padding);
		text-align: center;
		word-wrap: break-word;
	}

	.half {
		display: flex;
		text-align: left;
		vertical-align: middle;
	}
</style>
