import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function randomString() {
	let randomString = '';
	const randomNumber = Math.floor(Math.random() * 10);

	for (let i = 0; i < 20 + randomNumber; i++) {
		randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
	}

	return randomString;
}

function setState() {
	const state = randomString();
	localStorage.setItem('oauth-state', state);

	return state;
}

export const oauthState = (() => {
	const { set, update, subscribe } = writable(init());

	function init() {
		if (browser) {
			const state = localStorage.getItem('oauth-state');

			if (state != null) {
				return state;
			}
			return setState();
		}
	}

	return {
		update,
		subscribe,
		setState: () => {
			const state = setState();
			set(state);
			return state;
		}
	};
})();
