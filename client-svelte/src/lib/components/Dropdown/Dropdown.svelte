<script lang="ts">
	import { scale } from 'svelte/transition';
	import { clickOutside } from '$lib/helpers/actions';
	import { cn } from '$/lib/helpers/utils';
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const dispatch = createEventDispatcher<{ openChange: boolean }>();

	let className: string | undefined | null = undefined;
	export { className as class };
	export let wrapperClass: string | undefined | null = undefined;

	export let defaultOpen: boolean = false;
	export let open: boolean = false;

	if (defaultOpen) open = true;
	let isOpenStore: Writable<boolean> = writable(open);

	$: $isOpenStore = open;
	$: dispatch('openChange', $isOpenStore);

	setContext('alert-dropdown', isOpenStore);
</script>

<div use:clickOutside={() => ($isOpenStore = false)} class={cn('relative', wrapperClass)}>
	{#if $isOpenStore}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<ul
			data-pw="select-model-dropdown"
			in:scale={{ start: 0.9, duration: 100 }}
			out:scale={{ start: 0.9, duration: 100 }}
			on:click={() => ($isOpenStore = false)}
			class={cn(
				'absolute top-12 right-0 flex flex-col gap-1 p-1 max-h-96 rounded-md bg-foreground text-foreground-content overflow-auto shadow-float [&>*]:p-2 [&>*]:rounded-md [&>*]:cursor-pointer [&>*]:transition-colors [&>*]:duration-100',
				className
			)}
		>
			<slot />
		</ul>
	{/if}

	<slot name="trigger" />
</div>
