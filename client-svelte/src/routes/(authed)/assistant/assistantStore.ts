import { writable } from 'svelte/store';

export const queryType = writable<'chat' | 'simple' | 'structured'>('chat');
