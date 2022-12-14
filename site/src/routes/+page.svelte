<script lang="ts">
	import Section from '$lib/components/section.svelte';
	import PrimaryButton from '$lib/components/buttons/primary.svelte';
</script>

<Section>
	<h1>Knead a fresh slice of bot in your server?</h1>
	<p>Don't worry! We've got you covered like butter on bread.<br />It's the yeast we could do.</p>
	<PrimaryButton
		--background-color="var(--nord8)"
		--color="var(--nord2)"
		--border-color="var(--nord8)">Invite</PrimaryButton
	>
	<PrimaryButton>Support</PrimaryButton>
</Section>

<Section half={true}>
	<div class="half">
		<div>
			<h2>We're like a charcuterie board of Discord bots!</h2>
			<p>
				With a rising list of features, you should always be able to have some bun! Al-dough, we
				might be short a few breadsticks as we add more features.
			</p>
		</div>
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
		width: 50%;
		padding: 0 5rem;
	}
	figure figcaption {
		color: var(--nord4);
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
	.half {
		display: flex;
		align-items: center;
		padding-right: 5rem;
	}
</style>
