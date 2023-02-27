<script lang="ts">
	import DiscordIcon from '$lib/svg/discordIcon.svelte';

	interface GuildData {
		id: string;
		icon: string | null;
	}

	enum IconTypes {
		gif = 'image/gif',
		webp = 'image/webp'
	}

	export let guild: GuildData;

	function getIconData(guildData: GuildData) {
		const baseCDN = 'https://cdn.discordapp.com/';

		if (!guildData.icon) return null;

		const iconURL = `${baseCDN}icons/${guildData.id}/${guildData.icon}`;
		const fallback = `${baseCDN}icons/${guildData.id}/${guildData.icon}.png`;

		if (guildData.icon.startsWith('a_')) {
			return { type: IconTypes.gif, url: `${iconURL}.gif`, fallback };
		}

		return { type: IconTypes.webp, url: `${iconURL}.webp`, fallback };
	}

	const iconData = getIconData(guild);
</script>

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

<style>
	.icon img {
		border-radius: 50%;
	}

	.icon source {
		display: none;
	}

	.icon {
		display: inherit;
		width: 3rem;
		height: 3rem;
		margin-right: 1rem;
		margin-left: 0.5rem;
	}
</style>
