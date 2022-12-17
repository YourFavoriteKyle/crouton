<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/primary.svelte';
	import Section from '$lib/components/section.svelte';
</script>

<Section>
	<h1>Oops! Error 404<br />This isn't the bakery!</h1>
	<div class="container">
		<div>
			<p>
				You've ventured deep into the bakery. Either this dough is still mixing, or there is no
				bread to be had here.
			</p>
			<p>Let's go back to the counter. Don't worry! You can crust me! There is nothing here yet.</p>
			<PrimaryButton href={'/'}>Back to the Counter</PrimaryButton>
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
		width: 50rem;
	}
	figure figcaption {
		color: var(--nord4);
		text-align: center;
	}
	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		text-align: center;
	}
	p {
		font-size: 1.125rem;
		padding-bottom: 1.5rem;
	}
	.container {
		text-align: left;
		max-width: 50rem;
		margin: 2rem auto;
	}
	@media (max-width: 1000px) {
		h1 {
			font-size: 1.75rem;
		}
		figure {
			width: 70%;
			margin: 0 0 2rem 0;
		}
		.container {
			flex-direction: column-reverse;
			text-align: center;
			align-items: center;
		}
	}
</style>
