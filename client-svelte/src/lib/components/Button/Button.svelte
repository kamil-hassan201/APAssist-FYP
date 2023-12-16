<script lang="ts">
	import { cn } from '$lib/helpers/utils';
	import type { VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { buttonVariants } from './buttonVariants';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let type: HTMLButtonAttributes['type'] = undefined;
	export let variant: VariantProps<typeof buttonVariants>['variant'] = 'default';
	export let size: VariantProps<typeof buttonVariants>['size'] = 'default';
	export let disabled: boolean = false;
</script>

<button
	tabindex="0"
	{...$$restProps}
	{type}
	{disabled}
	class={cn(buttonVariants({ variant, size, className }))}
	on:click
	on:dblclick
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
	on:mousedown
>
	<slot />
</button>
