<script lang="ts">
	import { oauthState } from '../stores/auth';
</script>

<div class="container">
	<h3>Welcome to Discord Ewok Bot</h3>
	<p>Click on the below button to get started!</p>
	<a
		class="button"
		href={'https://discord.com/api/oauth2/authorize?client_id=1030596882357043220&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fdiscord&response_type=code&scope=identify%20email%20guilds&state=' +
			encodeURIComponent($oauthState)}
	>
		Login with Discord</a
	>
</div>

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
		margin: 300px auto;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: sans-serif;
	}
</style>
