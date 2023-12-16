<script lang="ts">
	import Chip from './Chip.svelte';
	export let chips: string[];
	export let maxVisibleChips: number = 5;
	export let onChipClick: (chip: string) => void;

	let isExpanded: boolean = false;
	let visibleChips: string[];
	$: visibleChips = isExpanded ? chips : chips.slice(0, maxVisibleChips);

	const showExpandButton = chips.length > maxVisibleChips;
</script>

<div class="flex justify-between mt-2">
	<div class="flex flex-wrap">
		{#each visibleChips as chip}
			<Chip text={chip} onClick={onChipClick} />
		{/each}
	</div>
	{#if showExpandButton}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => (isExpanded = !isExpanded)}
			class="text-center my-auto mt-2 mr-1 text-xs cursor-pointer text-gray-600 hover:text-gray-800"
		>
			{#if isExpanded}
				<p class="w-16 text-center">See Less &#x25B2;</p>
			{:else}
				<p>See more suggestion &#x25BC;</p>
			{/if}
		</div>
	{/if}
</div>
