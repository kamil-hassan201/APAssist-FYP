<script lang="ts">
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
	import ChatInput from './ChatInput.svelte';
	import ChatMessage from './ChatMessage.svelte';
	import type { Message } from '$/lib/types';
	import { browser } from '$app/environment';
	import { tick } from 'svelte';
	import QuickMessages from './QuickMessages.svelte';

	export let streamText: string = '| ';
	export let isFetching: boolean = false;

	export let messages: Message[];
	export let fetchResponse: (prompt: string) => void;

	const handleReplySelect = (reply: string) => {
		fetchResponse(reply);
	};

	let osRef: OverlayScrollbarsComponent;

	const scrollToBotttom = async (a: any, b: any) => {
		if (!browser) return;

		const osInstance = osRef?.osInstance();

		if (!osInstance) {
			return;
		}

		const chatWindow = osInstance.elements().viewport;

		if (
			chatWindow &&
			(chatWindow.scrollHeight - chatWindow.clientHeight - chatWindow.scrollTop < 50 || !isFetching)
		) {
			await tick();
			chatWindow.scrollTop = chatWindow.scrollHeight;
		}
	};
	$: scrollToBotttom(streamText, isFetching);
</script>

<section class="pt-0 pb-6 pl-6 min-h-0 max-h-screen min-w-0 overflow-hidden">
	<div class="flex flex-col h-full min-w-0 rounded-md">
		<OverlayScrollbarsComponent
			bind:this={osRef}
			on:osInitialized={(e) => {
				let chatWindow = e.detail[0].elements().viewport;
				chatWindow.scrollTop = chatWindow.scrollHeight;
			}}
			defer
			options={{
				overflow: {
					x: 'hidden'
				},
				scrollbars: { visibility: 'hidden' }
			}}
			data-pw="chat-window"
			id="chat-window"
			class="grow flex flex-col gap-2 pr-4 pt-6 pb-20 overflow-x-hidden overflow-y-auto [&>[data-overlayscrollbars-contents]]:flex [&>[data-overlayscrollbars-contents]]:flex-col [&>[data-overlayscrollbars-contents]]:gap-6"
		>
			<div class="space-y-4">
				{#each messages as message}
					<ChatMessage message={message.message} role={message.role} />
				{/each}
				{#if isFetching}
					<ChatMessage message={streamText} role="APAssist" />
				{/if}
			</div>
			{#if messages.length <= 1}
				<QuickMessages
					replies={[
						'I have lost my APCard, what should I do?',
						'How to pay for the Laundry service at Accomodation?',
						'I cannot sign in using APKey!',
						'I am outside malaysia, how can I transfer my fees?'
					]}
					onReplySelect={handleReplySelect}
				/>
			{/if}
		</OverlayScrollbarsComponent>

		<ChatInput {isFetching} {fetchResponse} />
	</div>
</section>
