<script lang="ts">
	import { conversations } from './assistantStore';
	import { authUser } from '$/lib/authStore';
	import Button from '$/lib/components/Button/Button.svelte';
	import ChatBubbleIcon from '$/lib/icons/ChatBubbleIcon.svelte';
	import DeleteIcon from '$/lib/icons/DeleteIcon.svelte';
	import PencilIcon from '$/lib/icons/PencilIcon.svelte';
	import type { IConversation } from '$/lib/types';
	import { goto } from '$app/navigation';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
	import { page } from '$app/stores';
	import Modal from '$/lib/components/Modal.svelte';
	import type { Types } from 'mongoose';

	let isDeleteModalOpen = false;
	let deletingConversationID: Types.ObjectId | null;
	let conversationDeletingName: string | null;

	const getConversations = async () => {
		try {
			const response = await fetch(`/api/conversation?userEmail=${$authUser?.email}`, {
				credentials: 'same-origin'
			});
			const data = await response.json();
			if (!data.success) {
				throw new Error("Couldn't fetch conversations with the logged in email!");
			}
			$conversations = data.data;
			return data.data as IConversation[];
		} catch (err) {
			console.log('error: ', err);
		}
	};
	let conversationsPromise = getConversations();

	const deleteConversation = async () => {
		try {
			const response = await fetch(`/api/conversation/${deletingConversationID}`, {
				method: 'DELETE',
				credentials: 'same-origin'
			});
			const data = await response.json();
			if (!data.success) {
				console.log(data?.error);
				throw new Error('Unable to delete conversation!');
			}
			if (data?.success) {
				const deletedConversation = data.data as IConversation;
				isDeleteModalOpen = false;

				if (deletedConversation?._id.toString() === $page.params.slug) {
					goto('/');
				}
				conversationsPromise = getConversations();
				deletingConversationID = null;
				return;
			}
			isDeleteModalOpen = false;
			deletingConversationID = null;
			alert('Something went wrong!');
		} catch (err) {
			console.log('error: ', err);
			alert(JSON.stringify(err));
		}
	};
</script>

<OverlayScrollbarsComponent
	defer
	data-pw="conversations"
	class="grow flex flex-col ml-6 pr-6 rounded-md overflow-auto os-dark"
>
	{#await conversationsPromise}
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
					class={`flex p-2 my-2 hover:cursor-pointer hover:bg-slate-600 rounded-xl ${
						$page.params.slug === conversation._id.toString() && 'bg-slate-600'
					}`}
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
							}}
							variant="ghost"><PencilIcon class="w-4   text-white" /></Button
						>
						<Button
							on:click={(e) => {
								e.stopPropagation();
								deletingConversationID = conversation._id;
								conversationDeletingName = conversation.name;
								isDeleteModalOpen = true;
							}}
							class="my-0 h-7"
							variant="ghost"
						>
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
<Modal
	title={conversationDeletingName ?? ''}
	show={isDeleteModalOpen}
	close={() => {
		isDeleteModalOpen = false;
	}}
>
	<div class="text-black">
		<p class="text-xl py-2 px-4">
			Are you sure you want to delete conversation {conversationDeletingName}?
		</p>
		<div class="flex justify-start gap-2 py-4">
			<Button
				on:click={() => {
					isDeleteModalOpen = false;
					deletingConversationID = null;
				}}
				size="lg"
				variant="underline">Cancel</Button
			>
			<Button on:click={deleteConversation} size="lg" variant="destructive">Delete</Button>
		</div>
	</div>
</Modal>

<style>
	.buttons {
		display: none;
	}

	:hover .buttons {
		display: flex;
	}
</style>
