<script lang="ts">
	export let text: string;
	export let onClick: (text: string) => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
	on:click={() => onClick(text)}
	class="cursor-pointer hover:bg-indigo-200 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 m-1"
>
	{text}
</span>
