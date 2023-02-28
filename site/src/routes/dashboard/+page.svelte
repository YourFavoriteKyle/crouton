<script lang="ts">
	import type { PageData } from './$types';
	import Section from '$lib/components/section.svelte';
	import OwnerIcon from '$lib/svg/ownerIcon.svelte';
	import ModeratorIcon from '$lib/svg/moderatorIcon.svelte';
	import GuildIcon from '$lib/components/guildIcon.svelte';

	export let data: PageData;
</script>

<div class="dashboard">
	<h1>Welcome to your bakery! Choose your server to get started!</h1>
	<Section half={true} --section-text-align="center" --section-flex-wrap="wrap">
		<div class="guild-wrapper">
			{#each data.userGuilds as guild (guild.id)}
				<div class="guild">
					<div class="info">
						<GuildIcon {guild} />
						<p class="name">{guild.name}</p>
						<div class="permission-icon">
							{#if guild.owner}
								<OwnerIcon />
							{:else if guild.permissions_flags?.ManageGuild}
								<ModeratorIcon />
							{/if}
						</div>
					</div>
					<a href="dashboard/{guild.id}">Configure</a>
				</div>
			{/each}
		</div>
	</Section>
</div>

<style>
	.dashboard {
		text-align: center;
	}

	.guild-wrapper {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1rem;
		grid-auto-flow: row dense;
	}

	.guild {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1rem;
		border: 1px solid var(--nord2);
	}

	.guild > .info {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
		height: inherit;
	}

	.permission-icon {
		align-self: flex-start;
		margin-left: auto;
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;
	}

	.name {
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	a {
		display: block;
		padding: 0.5rem 1rem;
		width: 100%;
		background-color: var(--nord6);
	}
</style>
