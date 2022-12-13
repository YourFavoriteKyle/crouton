<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if !$page.data.session}
	<div class="container">
		<h3>Welcome to Discord Ewok Bot</h3>
		<p>Click on the below button to get started!</p>

		<form method="POST" action="?/signin">
			<button class="button">Login with Discord</button>
		</form>
	</div>
{:else}
	<div>
		<form method="POST" action="?/signout">
			<button class="button">Sign out</button>
		</form>
	</div>
	<div class="profile-container">
		<h3>Welcome {$page.data.session.user.user_metadata.name}</h3>
		<img src={$page.data.session.user.user_metadata.avatar_url} alt="User Avatar" />
	</div>
{/if}

<style>
	.button {
		outline: none;
		padding: 10px;
		border: none;
		font-size: 20px;
		margin-top: 20px;
		border-radius: 8px;
		background: #6d81cd;
		cursor: pointer;
		text-decoration: none;
		color: white;
	}
	.container {
		margin: 0 auto;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: sans-serif;
	}
	.profile-container {
		margin: 0 auto;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: sans-serif;
	}
</style>
