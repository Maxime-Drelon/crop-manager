import { writable } from 'svelte/store';

// Types
import WeatherTypes from '$lib/modules/weather/types';
import type Droplet from '$lib/modules/weather/droplet';

// Utils
import LinkedList from '$lib/utils/LinkedList/LinkedList';

export const weatherState = writable(WeatherTypes.undefined);

const initDroplets: LinkedList<Droplet> = new LinkedList<Droplet>();
export const droplets = writable(initDroplets);