<script lang="ts">
	export let replies: string[];
	export let onReplySelect: (reply: string) => void;
</script>

<div class="grid grid-cols-2 gap-4 p-4 absolute bottom-0 w-[96.5%]">
	{#each replies as reply}
		<button
			on:click={() => onReplySelect(reply)}
			class="border-2 border-gray-300 text-gray-900 hover:bg-[#303338] hover:text-white font-light py-2 px-4 rounded-lg transition duration-200 ease-in-out"
		>
			{reply}
		</button>
	{/each}
</div>
