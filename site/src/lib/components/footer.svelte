<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/primary.svelte';
</script>

<footer>
	<div class="metadata">
		<h1 class="logo">Crouton</h1>
		<p class="description">Let's grow mold together!</p>
		<p class="copyright">© Crouton Bot 2022</p>
	</div>
	<div class="sitemap">
		<ul>
			<span>Product</span>
			<li>
				<PrimaryButton
					--hover-background-color="none"
					--padding="0"
					--border-width="0"
					method={'POST'}
					action={'/?/invite'}>Invite</PrimaryButton
				>
			</li>
			<li>
				<PrimaryButton
					href={'/dashboard'}
					--hover-background-color="none"
					--padding="0"
					--border-width="0">Dashboard</PrimaryButton
				>
			</li>
		</ul>
		<ul>
			<span>Resources</span>
			<li>
				<PrimaryButton
					href={'/privacy'}
					--hover-background-color="none"
					--padding="0"
					--border-width="0">Privacy</PrimaryButton
				>
			</li>
			<li>
				<PrimaryButton
					href={'/terms'}
					--hover-background-color="none"
					--padding="0"
					--border-width="0">Terms</PrimaryButton
				>
			</li>
			<li>
				<PrimaryButton
					href={'https://discord.gg/kFZ4zfhjCc'}
					--hover-background-color="none"
					--padding="0"
					--border-width="0">Support</PrimaryButton
				>
			</li>
			<li>
				<PrimaryButton
					href={'/contact'}
					--hover-background-color="none"
					--padding="0"
					--border-width="0">Contact</PrimaryButton
				>
			</li>
		</ul>
		<ul>
			<span>Docs</span>
			<li>
				<PrimaryButton
					href={'/docs/dashboard'}
					--hover-background-color="none"
					--padding="0"
					--border-width="0">Dashboard</PrimaryButton
				>
			</li>
			<li>
				<PrimaryButton
					href={'/docs/commands'}
					--hover-background-color="none"
					--padding="0"
					--border-width="0">Commands</PrimaryButton
				>
			</li>
		</ul>
	</div>
</footer>

<style>
	footer {
		width: 100%;
		min-height: 10rem;
		padding: 4rem var(--page-padding);
		padding-top: 2rem;
		display: flex;
	}
	.metadata {
		min-width: 25rem;
	}
	.logo {
		font-size: 2rem;
		font-weight: 500;
	}
	.copyright {
		font-weight: 300;
		font-size: 0.85rem;
	}
	.description {
		font-weight: 500;
		font-size: 1.25rem;
	}
	.sitemap {
		display: flex;
		width: 100%;
	}
	.sitemap > ul {
		width: 100%;
	}
	.sitemap > ul > span {
		width: 100%;
		display: inline-block;
		border-bottom-width: 0.1rem;
		border-color: var(--nord2);
		margin-bottom: 0.5rem;
	}
	.sitemap > ul > li {
		min-width: fit-content;
	}
	@media (max-width: 1200px) {
		footer {
			flex-direction: column;
		}
		.metadata {
			margin: 1rem auto;
			text-align: center;
		}
	}
	@media (max-width: 768px) {
		.metadata {
			min-width: 10rem;
		}
		.sitemap {
			flex-direction: column;
			text-align: center;
		}
		.sitemap > ul {
			width: 100%;
			margin-top: 2rem;
		}
	}
</style>
