<script lang="ts">
	import { cn } from '$/lib/helpers/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { Button } from '$lib/components/Button';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isOpenStore: Writable<boolean> = getContext('alert-dropdown');
</script>

<Button
	{...$$restProps}
	on:mouseenter
	on:click={() => {
		$isOpenStore = !$isOpenStore;
	}}
	class={cn(
		'bg-foreground text-foreground-content hover:bg-foreground disabled:bg-opacity-50 rounded-lg disabled:text-opacity-50 shadow-float fill-foreground-content disabled:fill-foreground-content/50 min-w-max',
		className
	)}
>
	<slot />
</Button>
