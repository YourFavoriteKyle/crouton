import { writable, type Subscriber } from 'svelte/store';

export function createOAuthExpiration(endTime: string) {
	let currentTime = new Date().getTime() * 1000;
	const expires_at = new Date(endTime).getTime() * 1000;
	return writable(expires_at - currentTime, (set: Subscriber<number>) => {
		const interval = setInterval(() => {
			currentTime = new Date().getTime() * 1000;
			set(expires_at - currentTime);
		}, 60000);
		return () => clearInterval(interval);
	});
}
