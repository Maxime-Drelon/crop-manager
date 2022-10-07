import { writable } from 'svelte/store';

export const blocSelectionModal = writable({
	isOpen: false,
	x: 0,
	y: 0
});

export const buildMode = writable(false);
