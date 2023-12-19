<script lang="ts">
	import { authUser } from '$/lib/authStore';
	import Button from '$/lib/components/Button/Button.svelte';
	import ChatBubbleIcon from '$/lib/icons/ChatBubbleIcon.svelte';
	import DeleteIcon from '$/lib/icons/DeleteIcon.svelte';
	import PencilIcon from '$/lib/icons/PencilIcon.svelte';
	import type { IConversation } from '$/lib/types';
	import { goto } from '$app/navigation';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';

	const getConversations = async () => {
		try {
			const response = await fetch(`/api/conversation?userEmail=${$authUser?.email}`, {
				credentials: 'same-origin'
			});
			const data = await response.json();
			if (!data.success) {
				throw new Error("Couldn't fetch conversations with the logged in email!");
			}
			return data.data as IConversation[];
		} catch (err) {
			console.log('error: ', err);
		}
	};
</script>

<OverlayScrollbarsComponent
	defer
	data-pw="conversations"
	class="grow flex flex-col ml-6 pr-6 rounded-md overflow-auto os-dark"
>
	{#await getConversations()}
		Loading conversations......
	{:then conversations}
		{#if conversations?.length}
			{#each conversations as conversation}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => {
						goto(`/assistant/chat/${conversation._id}`);
					}}
					class="flex p-2 my-2 hover: cursor-pointer hover:bg-slate-600 rounded-xl"
				>
					<ChatBubbleIcon class="h-7 mr-2 my-auto" />
					<p class="my-auto whitespace-nowrap overflow-hidden">
						{conversation.name}
					</p>
					<div class="flex grow justify-end buttons">
						<Button
							class="my-0 h-7"
							on:click={(e) => {
								e.stopPropagation();
								console.log('hi');
							}}
							variant="ghost"><PencilIcon class="w-4   text-white" /></Button
						>
						<Button class="my-0 h-7" variant="ghost">
							<DeleteIcon class="w-4 text-white" /></Button
						>
					</div>
				</div>
			{/each}
		{:else}
			<div class="flex p-2 my-2 cursor-pointer hover:bg-slate-600 rounded-xl">
				<ChatBubbleIcon class="h-7 mr-2" />
				<p>New Chat</p>
			</div>
		{/if}
	{:catch someError}
		<p>System error: {someError.message}.</p>
	{/await}
</OverlayScrollbarsComponent>

<style>
	.buttons {
		display: none;
	}

	:hover .buttons {
		display: flex;
	}
</style>
