<script lang="ts">
	import ChatBubbleIcon from '$/lib/icons/ChatBubbleIcon.svelte';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
</script>

<OverlayScrollbarsComponent
	defer
	data-pw="conversations"
	class="grow flex flex-col ml-6 pr-6 rounded-md overflow-auto os-dark"
>
	<div class="flex p-2 my-2 cursor-pointer hover:bg-slate-600 rounded-xl">
		<ChatBubbleIcon class="h-7 mr-2" />
		<p>First Conversation</p>
	</div>
	<div class="flex p-2 my-2 cursor-pointer hover:bg-slate-600 rounded-xl">
		<ChatBubbleIcon class="h-7 mr-2" />
		<p>Second Conversation</p>
	</div>
</OverlayScrollbarsComponent>
