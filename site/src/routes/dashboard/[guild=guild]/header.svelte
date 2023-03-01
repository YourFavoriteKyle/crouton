<script lang="ts">
	import type { APIGuild } from 'discord-api-types/v10';
	import GuildIcon from '$lib/components/guildIcon.svelte';

	export let guild: APIGuild;
</script>

<div class="header">
	<div class="header-section">
		<a href="/dashboard">&#10094;</a>
		<GuildIcon {guild} width="4rem" />
		<h1>{guild.name}</h1>
	</div>
	<div class="header-section">
		{guild.approximate_presence_count} Members Online / {guild.approximate_member_count} Members
	</div>
</div>

<style>
	.header {
		display: flex;
		height: 100%;
		padding-bottom: 1rem;
		justify-content: space-between;
	}

	.header-section {
		display: flex;
		align-items: center;
		font-size: 1.25rem;
	}

	.header-section > a {
		padding: 0.5rem 1rem;
		font-size: 2rem;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: normal;
	}
</style>
