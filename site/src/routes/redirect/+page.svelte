<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	onMount(async () => {
		if (data.session) {
			goto('/dashboard');
			return;
		}
		goto('/');
	});
</script>
