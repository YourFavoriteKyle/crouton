<script lang="ts">
	import type { PageData } from './$types';
	import type { RESTAPIPartialCurrentUserGuild } from 'discord-api-types/v10';
	import Section from '$lib/components/section.svelte';
	import DiscordIcon from '$lib/svg/discordIcon.svelte';
	import OwnerIcon from '$lib/svg/ownerIcon.svelte';
	import ModeratorIcon from '$lib/svg/moderatorIcon.svelte';

	export let data: PageData;

	// console.log(data);

	function constructIconURL(guildData: RESTAPIPartialCurrentUserGuild): {
		type: 'image/webp' | 'image/gif';
		url: string;
		fallback: string;
	} | null {
		const baseCDN = 'https://cdn.discordapp.com/';

		if (!guildData.icon) return null;

		const iconURL = `${baseCDN}icons/${guildData.id}/${guildData.icon}`;
		const fallback = `${baseCDN}icons/${guildData.id}/${guildData.icon}.png`;

		if (guildData.icon.startsWith('a_')) {
			return { type: 'image/gif', url: `${iconURL}.gif`, fallback };
		}

		return { type: 'image/webp', url: `${iconURL}.webp`, fallback };
	}
</script>

<div class="dashboard">
	<h1>Welcome to your bakery! Choose your guild to get started!</h1>
	<Section half={true} --section-text-align="center" --section-flex-wrap="wrap">
		<div class="guild-wrapper">
			{#each data.userGuilds as guild (guild.id)}
				{@const iconData = constructIconURL(guild)}
				<div class="guild">
					<div class="info">
						<div class="icon">
							{#if iconData}
								<picture>
									<source srcset={iconData.url} type={iconData.type} />
									<img loading="lazy" alt="guild icon" src={iconData.fallback} />
								</picture>
							{:else}
								<DiscordIcon theme="blue" />
							{/if}
						</div>
						<p class="name">{guild.name}</p>
						{#if guild.owner}
							<div class="permission-icon">
								<OwnerIcon />
							</div>
						{:else if guild.permissions_flags?.ManageGuild}
							<div class="permission-icon">
								<ModeratorIcon />
							</div>
						{/if}
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
		padding: 1rem;
		border: 1px solid var(--nord2);
	}

	.guild > .info {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
		height: inherit;
	}
	.info > .icon img {
		border-radius: 50%;
	}

	.info > .icon source {
		display: none;
	}

	.guild > .info > .icon {
		display: inherit;
		width: 3rem;
		height: 3rem;
		margin-right: 1rem;
		margin-left: 0.5rem;
	}

	.permission-icon {
		align-self: flex-start;
		margin-left: auto;
	}

	.name {
		text-align: left;
	}

	a {
		display: block;
		padding: 0.5rem 1rem;
		width: 100%;
		background-color: var(--nord6);
	}
</style>
