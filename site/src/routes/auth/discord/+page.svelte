<script>
	import { onMount } from 'svelte';
	import { oauthState } from '../../../stores/auth';

	/** @type {import('./$types').PageData} */
	export let data;

	const baseURL = 'https://cdn.discordapp.com/';

	onMount(() => {
		const fragment = new URLSearchParams(window.location.search);
		const state = fragment.get('state');
		if (!state) {
			return;
		}

		if ($oauthState !== state) {
			console.log('You may have been click-jacked!');
		}
	});
</script>

<div class="profile-container">
	<h3>Welcome {data.username}#{data.discriminator}</h3>

	<img src={baseURL + 'avatars/' + data.id + '/' + data.avatar} alt="User Avatar" />
	<img class="banner" src={baseURL + 'banners/' + data.id + '/' + data.banner} alt="User Avatar" />
</div>

<style>
	.profile-container {
		margin: 300px auto;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: sans-serif;
	}
</style>
