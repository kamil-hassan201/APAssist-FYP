import type { IConversation } from '$/lib/types';
import { writable } from 'svelte/store';

export const queryType = writable<'chat' | 'simple' | 'structured'>('chat');
export const conversations = writable<IConversation[]>([]);
export const activatedChatTitle = writable<string>('');
