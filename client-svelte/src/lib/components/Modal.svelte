<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cn } from '../helpers/utils';
	import CloseIcon from '../icons/CloseIcon.svelte';
	import Button from './Button/Button.svelte';
	let className: string | undefined | null = undefined;
	export { className as class };
	export let show = false;
	export let close: () => void;
	export let title: string | undefined = '';
	// export let width: number = 40;
</script>

{#if show}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full text-black z-50"
		on:click={close}
		on:blur={close}
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class={cn(
				`relative top-[20vh] mx-auto border w-[40vw] z-50  p-2 bg-white rounded-lg`,
				className
			)}
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 150 }}
			on:click|stopPropagation
		>
			<!-- <div class="absolute right-2 top-2">
				<Button class="rounded-full h-18 w-18" variant="ghost" on:click={close}
					><CloseIcon class="w-6 h-6" /></Button
				>
			</div>
			<div /> -->
			<div class="relative flex items-center justify-between px-6 py-2 w-full bg-dialog-bg-1">
				<h3 class="text-xl font-bold">
					{title ?? ''}
				</h3>
				<Button variant="ghost" on:click={close} class="p-0 h-10 w-10">
					<CloseIcon class="w-7" />
				</Button>
				<hr
					class="absolute -left-8 bottom-0 w-[calc(100%_+_2rem)] border-[#DDDDDD] data-dark:border-transparent"
				/>
			</div>
			<div class="p-2">
				<slot />
			</div>
		</div>
	</div>
{/if}
