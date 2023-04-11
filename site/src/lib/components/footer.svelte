<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/primary.svelte';
</script>

<footer>
	<div class="container">
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
						--button-hover-bg-color="none"
						--button-padding="0"
						--button-border-width="0"
						href={'/invite'}>Invite</PrimaryButton
					>
				</li>
				<li>
					<PrimaryButton
						href={'/dashboard'}
						--button-hover-bg-color="none"
						--button-padding="0"
						--button-border-width="0">Dashboard</PrimaryButton
					>
				</li>
			</ul>
			<ul>
				<span>Resources</span>
				<li>
					<PrimaryButton
						href={'/privacy'}
						--button-hover-bg-color="none"
						--button-padding="0"
						--button-border-width="0">Privacy</PrimaryButton
					>
				</li>
				<li>
					<PrimaryButton
						href={'/terms'}
						--button-hover-bg-color="none"
						--button-padding="0"
						--button-border-width="0">Terms</PrimaryButton
					>
				</li>
				<li>
					<PrimaryButton
						href={'https://discord.gg/kFZ4zfhjCc'}
						--button-hover-bg-color="none"
						--button-padding="0"
						--button-border-width="0">Support</PrimaryButton
					>
				</li>
				<li>
					<PrimaryButton
						href={'/contact'}
						--button-hover-bg-color="none"
						--button-padding="0"
						--button-border-width="0">Contact</PrimaryButton
					>
				</li>
			</ul>
			<ul>
				<span>Docs</span>
				<li>
					<PrimaryButton
						href={'/docs/dashboard'}
						--button-hover-bg-color="none"
						--button-padding="0"
						--button-border-width="0">Dashboard</PrimaryButton
					>
				</li>
				<li>
					<PrimaryButton
						href={'/docs/commands'}
						--button-hover-bg-color="none"
						--button-padding="0"
						--button-border-width="0">Commands</PrimaryButton
					>
				</li>
			</ul>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--nord4);
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
		font-weight: 500;
		font-size: 1.125rem;
	}
	.sitemap > ul > li {
		min-width: fit-content;
	}
	.container {
		padding: 3rem 2rem;
	}
	@media (max-width: 1000px) {
		.metadata {
			min-width: 10rem;
			margin: 1rem auto;
			text-align: center;
		}
		.sitemap > ul {
			margin-top: 1rem;
		}
		.container {
			flex-direction: column;
			text-align: center;
			align-items: center;
			padding: 3rem;
		}
	}
	@media (max-width: 768px) {
		.sitemap {
			flex-direction: column;
		}
	}
</style>
