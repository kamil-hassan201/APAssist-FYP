<script lang="ts">
	import { page } from '$app/stores';
	import Dropdown from '$/lib/components/Dropdown/Dropdown.svelte';
	import DropdownTrigger from '$/lib/components/Dropdown/DropdownTrigger.svelte';
	import ArrowdownIcon from '$lib/icons/ArrowdownIcon.svelte';
	import { queryType } from './assistantStore';
	import Tooltip from '$/lib/components/Tooltip.svelte';

	let tooltipHtml = `<strong>Chat</strong> - Use to ask follow up questions. <br/> 
                     <strong>Simple</strong> - Use simple when you want to ask stand alone question. <br/> 
                     <strong>Structured</strong> - Use structured query only when you feel like The LLM is hallucinating`;

	$: queryTypes = $page.data.queryTypes;
</script>

<div
	class="relative grow flex items-center justify-between gap-6 py-3 pl-5 h-full w-full max-w-[calc(100vw-15.5rem+20rem)]"
>
	<div title="New chat" class="grow self-end">
		<h2 class="font-medium line-clamp-1">New chat</h2>
	</div>

	<div class="flex gap-4 items-center">
		<Tooltip width="20px">{@html tooltipHtml}</Tooltip>

		<Dropdown class="z-20 bg-white data-dark:bg-[#333] overflow-x-hidden text-black">
			<svelte:fragment>
				{#each queryTypes as { name, value }}
					<button
						on:click={() => {
							$queryType = value;
						}}
						class="flex gap-10 min-w-max text-sm text-left hover:bg-black/[0.16]"
					>
						<span>Query Type:</span>
						<span class="uppercase">{name}</span>
					</button>
				{/each}
			</svelte:fragment>

			<DropdownTrigger
				title="Select model"
				slot="trigger"
				class="flex justify-between gap-4 xl:gap-8 px-3 pl-4 py-4 min-w-[9rem] text-black data-dark:text-white bg-white data-dark:bg-[#333] hover:bg-white data-dark:hover:bg-[#333] fill-black data-dark:fill-white disabled:fill-black/50 disabled:data-dark:fill-white/50"
			>
				<span class="whitespace-nowrap line-clamp-1 font-normal">
					Query Type - <span class="capitalize">{$queryType} </span>
				</span>
				<ArrowdownIcon class="h-4 w-4" />
			</DropdownTrigger>
		</Dropdown>
	</div>
</div>
