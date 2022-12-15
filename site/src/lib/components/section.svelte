<script lang="ts">
	export let half = false;
</script>

<section class:half>
	<slot />
</section>

<style>
	section:first-of-type {
		padding: 8rem 0 8rem 0;
	}
	section:last-of-type {
		padding-bottom: 16rem;
	}
	section {
		padding: 8rem 0;
		text-align: center;
		word-wrap: break-word;
	}

	.half {
		display: flex;
		text-align: left;
		vertical-align: middle;
		align-items: center;
	}
	@media (max-width: 1000px) {
		.half {
			display: block;
		}
		section {
			padding: 4rem 0;
		}
		section:first-of-type {
			padding: 4rem 0 4rem 0;
		}
		section:last-of-type {
			padding-bottom: 8rem;
		}
	}
</style>
