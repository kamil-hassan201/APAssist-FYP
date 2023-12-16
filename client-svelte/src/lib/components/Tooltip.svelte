<script lang="ts">
	import infoIcon from '$/lib/assets/info-icon.svg';
	export let width: string = '40px';
	export let label: string = '';
	let isHovered: boolean = false;
</script>

<div class="relative inline-block">
	<img
		on:mouseenter={() => (isHovered = true)}
		on:mouseleave={() => (isHovered = false)}
		{width}
		src={infoIcon}
		alt="This is a tooltip icon"
	/>

	<span
		class={`absolute ${
			isHovered ? 'visible' : 'invisible'
		} bg-black bg-opacity-50 text-white text-sm w-72 py-2 px-4 rounded z-10 top-full mt-6 left-1/2 transform -translate-x-1/2`}
	>
		{#if !!label}
			{label}
		{/if}
		<slot />
	</span>
</div>
