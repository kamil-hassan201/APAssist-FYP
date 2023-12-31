<script lang="ts">
	import '$/app.css';
	import { showLoadingOverlay } from '$/globalStore';
</script>

<div class="flex flex-col h-screen bg-gray-200 text-white"><slot /></div>
{#if $showLoadingOverlay}
	<div
		class="absolute top-0 bottom-0 left-0 right-0 z-[9999] flex items-center justify-center bg-black/60"
	>
		<span class="loading loading-spinner loading-lg text-accent-2" />
	</div>
{/if}
