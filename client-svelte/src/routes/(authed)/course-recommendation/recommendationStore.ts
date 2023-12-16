import { writable } from 'svelte/store';

export const isRefresh = writable<boolean>(false);
