import WeatherTypes from '$lib/types/weather';
import { writable } from 'svelte/store';

export const blocSelectionModal = writable({
	isOpen: false,
	x: 0,
	y: 0
});

export const buildMode = writable(false);

export const weatherState = writable(WeatherTypes.undefined);

const initGouttes: THREE.Mesh[] = [];
export const gouttes = writable(initGouttes);