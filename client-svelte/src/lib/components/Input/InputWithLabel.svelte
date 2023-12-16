<!-- InputWithLabel.svelte -->
<script lang="ts">
	export let id: string;
	export let label: string;
	export let value: string;
	export let readonly: boolean = false;
</script>

<div>
	<label for={id} class="block text-sm font-medium text-gray-700">
		{label}
	</label>
	<input
		type="text"
		name={id}
		{id}
		bind:value
		{readonly}
		class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
	/>
</div>
