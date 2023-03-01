<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { backOut, cubicOut } from 'svelte/easing';

	interface GuildData {
		premium_subscription_count?: number;
		premium_tier: number;
	}

	export let guild: GuildData;

	function normalizeSubCount(subCount: number, max: number, min = 0) {
		// Tier 1 boost count
		if (subCount > 0 && subCount < 3) {
			return 16.665 * subCount;
		}

		// Tier 2 boost count
		if (subCount > 2 && subCount < 8) {
			return 33.33 + 6.666 * (subCount - 2);
		}

		// Tier 3 boost count
		if (subCount > 7 && subCount < 15) {
			return 66.66 + 4.76 * (subCount - 7);
		}

		// Default return for store
		return 0;
	}

	const subCount = tweened(0, { duration: 400, easing: cubicOut });
	const activeTier = tweened(1, { delay: 1200, duration: 300, easing: backOut });

	let currentCount = guild.premium_subscription_count ? guild.premium_subscription_count : 0;

	subCount.set(normalizeSubCount(currentCount, 14, 0));
	activeTier.set(2);
</script>

<div class="tier-bar-container">
	<div class="tier-bar">
		<div class="background bar">
			<div class="foreground bar" style:width="{$subCount}%" />
		</div>
		<div class="tier-container">
			{#each Array(4) as _, i}
				<div class="tier-group">
					<div class="tier-background" />
					{#if guild.premium_tier == i}
						<div class="tier-icon" style:width="{$activeTier}rem" style:height="{$activeTier}rem" />
					{:else}
						<div class="tier-icon" />
					{/if}
					{#if i > 0}
						<div class="tier-label">Level {i}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.tier-bar-container {
		--progress-height: 0.375rem;

		padding: 0 1rem;
	}

	.tier-bar {
		position: relative;
		height: 4rem;
	}

	.bar {
		position: absolute;
		top: 0;

		height: var(--progress-height);
		width: 100%;

		transition: width 1s ease-in-out;
	}

	.background {
		top: calc(35% - (var(--progress-height) / 2));

		background-color: var(--nord4);
	}

	.foreground {
		width: 0%;
		background-color: var(--nord8);
	}

	.tier-container {
		position: absolute;
		top: calc(35% - (2rem / 2));
		bottom: 0;
		width: 100%;
		height: fit-content;
		display: flex;
		justify-content: space-between;
	}

	.tier-group {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2rem;
		height: 2rem;
	}

	.tier-background {
		position: absolute;
		width: inherit;
		height: inherit;
		background-color: var(--nord6);
	}

	.tier-icon {
		position: absolute;
		width: 1.25rem;
		height: 1.25rem;

		border-radius: 1rem;
		background-color: var(--nord8);
	}

	.tier-label {
		position: absolute;
		margin-top: 4rem;

		text-align: center;
		white-space: nowrap;
	}
</style>
