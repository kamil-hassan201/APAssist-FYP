<script>
	import Button from '$/lib/components/Button/Button.svelte';
	import Tooltip from '$/lib/components/Tooltip.svelte';
	import RefreshIcon from '$/lib/icons/RefreshIcon.svelte';
	import { isRefresh } from './recommendationStore';
</script>

<div
	class="relative grow flex items-center justify-between gap-6 pr-5 h-full w-full max-w-[calc(100vw-15.5rem+20rem)]"
>
	<div class="flex items-center justify-between w-full font-semibold text-white">
		<p class="text-lg text-center">Course Recommendation &nbsp;</p>
		<!-- <Tooltip
			width="15px"
			label="Try to key in as many information as possible for better result!"
		/> -->
		<Button
			on:click={() => {
				$isRefresh = !$isRefresh;
			}}
			variant="ghost"><RefreshIcon class="text-white w-8 mr-2" /> Refresh</Button
		>
	</div>
</div>
