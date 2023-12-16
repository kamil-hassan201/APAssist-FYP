/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { persisted } from 'svelte-local-storage-store';
import { serializer } from '$lib/helpers/utils';
import { writable } from 'svelte/store';

export const showDock = persisted('dockopen', true, { serializer });
export const showLoadingOverlay = writable(false);
