<script lang="ts">
	import Section from '$lib/components/section.svelte';
	import PrimaryButton from '$lib/components/buttons/primary.svelte';
</script>

<Section>
	<h1>Oops! This isn't the bakery!</h1>
	<h2>Error 404</h2>
	<div class="half">
		<div>
			<p>
				You've ventured to deep into the bakery. Either this dough is still mixing, or there is no
				bread to be had here.
			</p>
			<p>Let's go back to the counter. Don't worry! You can crust me! There is nothing here yet.</p>
			<PrimaryButton href={{ link: '/', alt: 'home page' }}>Back to the Counter</PrimaryButton>
		</div>
		<figure>
			<img
				src="https://img.freepik.com/free-vector/baking-industry-online-service-platform-baking-pastry-process-bakery-worker-making-dough-pastries-goods-online-smart-factory-flat-vector-illustration_613284-1066.jpg?w=1380&t=st=1670988611~exp=1670989211~hmac=78d1b3880a5f9fd68a4c22bb141c90c7d6cd210d9f8b624194934ecf8f4750b0"
				alt="bread mixer"
			/>

			<figcaption>
				<a
					href="https://www.freepik.com/free-vector/baking-industry-online-service-platform-baking-pastry-process-bakery-worker-making-dough-pastries-goods-online-smart-factory-flat-vector-illustration_26432586.htm#query=bread%20furnace%20cartoon&position=0&from_view=search&track=sph"
					>Image by vector4stock</a
				> on Freepik
			</figcaption>
		</figure>
	</div>
</Section>

<style>
	figure {
		height: auto;
		max-width: 90%;
		padding: 0 5rem;
	}
	figure figcaption {
		color: var(--nord4);
	}
	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin: 0 auto;
	}
	h2 {
		font-weight: 600;
		margin: 0 auto;
		padding: 1rem 0;
		font-size: 2rem;
	}
	p {
		font-size: 1.125rem;
		padding-bottom: 2rem;
	}
	.half {
		display: flex;
		align-items: center;
		/* padding-right: 5rem; */
	}
	@media (max-width: 1000px) {
		.half {
			display: block;
		}
		figure {
			margin: 0 auto;
			width: 100%;
		}
	}
</style>
