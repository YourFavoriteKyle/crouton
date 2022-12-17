<script lang="ts">
	import Profile from './profile.svelte';
	import { page } from '$app/stores';
	import PrimaryButton from '$lib/components/buttons/primary.svelte';
</script>

<nav>
	<div class="container">
		<!-- LOGO -->
		<div class="logo">
			<PrimaryButton
				href={'/'}
				active={false}
				--button-hover-bg-color="none"
				--button-border-width="0">Crouton</PrimaryButton
			>
		</div>
		<!-- NAV MENU -->
		<div class="links">
			<input type="checkbox" id="hamburger-toggle" />
			<label for="hamburger-toggle" class="hamburger">&#9776</label>
			<!--  NAV MENUS -->
			<ul class="menu">
				<li>
					<PrimaryButton method={'POST'} action={'/?/invite'} --button-border-width="0"
						>Invite</PrimaryButton
					>
				</li>
				<li>
					<PrimaryButton href={'/commands'} --button-border-width="0">Commands</PrimaryButton>
				</li>
				<li>
					<PrimaryButton href={'/docs'} --button-border-width="0">Docs</PrimaryButton>
				</li>
				<li>
					<PrimaryButton href={'https://discord.gg/kFZ4zfhjCc'} --button-border-width="0"
						>Support</PrimaryButton
					>
				</li>
				{#if !$page.data.session}
					<li>
						<PrimaryButton method={'POST'} action={'/?/signin'} --button-border-width="0"
							>Login</PrimaryButton
						>
					</li>
				{:else}
					<li>
						<Profile />
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>

<style>
	:root {
		--nav-bg-color: white;
	}
	/* NAVBAR STYLING */
	nav {
		background-color: var(--nav-bg-color);
		position: fixed;
		top: 0;
		width: 100%;
	}
	.container {
		padding: 1rem 2rem;
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
</style>
