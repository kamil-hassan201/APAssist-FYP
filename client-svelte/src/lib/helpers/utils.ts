import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

//* Custom serializer for svelte-local-storage-store
export const serializer = {
	parse: (text: string) => {
		try {
			return JSON.parse(text);
		} catch (e) {
			return text;
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	stringify: (object: any) => {
		try {
			return JSON.stringify(object);
		} catch (e) {
			return object;
		}
	}
};

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
