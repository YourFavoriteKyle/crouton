<script lang="ts">
	import Section from '$lib/components/section.svelte';
	import PrimaryButton from '$lib/components/buttons/primary.svelte';
</script>

<Section --section-text-align="center">
	<h1>Knead a fresh slice of bot in your server?</h1>
	<p>Don't worry! We've got you covered like butter on bread.<br />It's the yeast we could do.</p>
	<div>
		<PrimaryButton
			href={'/invite'}
			--button-bg-color="var(--nord8)"
			--button-color="var(--nord2)"
			--button-border-color="var(--nord8)">Invite</PrimaryButton
		>
		<PrimaryButton href={'https://discord.gg/kFZ4zfhjCc'}>Support</PrimaryButton>
	</div>
</Section>

<Section half={true}>
	<div class="section-content">
		<h2>We're like a charcuterie board of Discord bots!</h2>
		<p>
			With a rising list of features, you should always be able to have some bun! Al-dough, we might
			be short a few breadsticks as we add more features.
		</p>
	</div>
	<figure>
		<img
			src="https://img.freepik.com/free-vector/drawn-types-cheese-wooden-board-illustration_23-2148809825.jpg?w=1380&t=st=1670968533~exp=1670969133~hmac=0fa852fc6f2d4ed26543bd16bd59f4043ce098cfc86c2437b8686725346b2627"
			alt="wooden board with variety of bread"
		/>
		<figcaption>
			Image by
			<a
				href="https://www.freepik.com/free-vector/drawn-types-cheese-wooden-board-illustration_11827634.htm#query=charcuterie%20board&position=47&from_view=keyword"
				>Freepik</a
			>
		</figcaption>
	</figure>
</Section>

<style>
	figure {
		height: auto;
		width: 25rem;
		margin: 0 auto;
	}
	figure figcaption {
		color: var(--nord4);
		text-align: center;
	}
	h1 {
		font-size: 2.5rem;
		font-weight: 700;
	}
	h2 {
		font-weight: 600;
		margin: 0 auto;
		font-size: 1.5rem;
	}
	p {
		font-size: 1.125rem;
	}
	.section-content {
		padding: 0 12.5rem 0 0;
	}
	@media (max-width: 1000px) {
		figure {
			width: 50%;
		}
		.section-content {
			padding: 0;
		}
	}
	@media (max-width: 768px) {
		figure {
			width: 75%;
		}
		.section-content {
			padding: 0;
		}
	}
</style>
