<script lang="ts">
	import Profile from './profile.svelte';
	import { page } from '$app/stores';
	import PrimaryButton from '$lib/components/buttons/primary.svelte';
</script>

<nav class="navbar">
	<!-- LOGO -->
	<div class="logo">
		<a href="/">Crouton</a>
	</div>
	<!-- NAV MENU -->
	<ul class="links">
		<input type="checkbox" id="hamburger-toggle" />
		<label for="hamburger-toggle" class="hamburger">&#9776</label>
		<!--  NAV MENUS -->
		<div class="menu">
			<a href="/"><li>Invite</li></a>
			<a href="/"><li>Commands</li></a>
			<a href="/"><li>Docs</li></a>
			<a href="https://discord.gg/kFZ4zfhjCc"><li>Support</li></a>
			{#if !$page.data.session}
				<PrimaryButton method={'POST'} action={'?/signin'} --border-width="0">Login</PrimaryButton>
			{:else}
				<Profile />
			{/if}
		</div>
	</ul>
</nav>

<style>
	/* NAVBAR STYLING */
	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem var(--page-padding);
		background-color: white;
	}
	.links a {
		color: inherit;
	}
	.logo {
		font-size: 2rem;
		font-weight: 500;
	}
	.menu {
		display: flex;
		gap: 1.25rem;
		font-size: 1.125rem;
	}
	.menu li:hover {
		background-color: var(--nord5);
		border-radius: 0.5rem;
		transition: 0.3s ease;
	}
	.menu li {
		padding: 0.5rem 1rem;
		transition: 0.3s ease;
	}
	/* RESPONSIVE */
	/* HAMBURGER TOGGLE */
	#hamburger-toggle {
		display: none;
	}
	.hamburger {
		display: none;
		font-size: 1.5rem;
		user-select: none;
	}
	/* MEDIA QUERY */
	@media (max-width: 768px) {
		.menu {
			display: none;
			position: absolute;
			background-color: white;
			right: 0;
			left: 0;
			text-align: center;
			padding: 1rem 0;
		}
		#hamburger-toggle:checked ~ .menu {
			display: block;
		}
		.hamburger {
			display: block;
		}
		.menu li {
			margin: 0.75rem 0 0 0;
		}
	}
	@media (max-width: 1450px) {
		.navbar {
			padding: 1rem;
		}
	}
</style>
