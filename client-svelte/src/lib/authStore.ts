import { writable } from 'svelte/store';

export interface AuthUser {
	uid: string;
	email: string;
	displayName: string;
}

const authUser = writable<AuthUser | undefined>(undefined);

export { authUser };
