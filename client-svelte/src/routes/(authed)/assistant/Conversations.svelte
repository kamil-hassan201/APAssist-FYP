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
	import { showLoadingOverlay } from '$/globalStore';

	let isDeleteModalOpen = false;
	let deletingConversationID: Types.ObjectId | null;
	let conversationDeletingName: string | null;

	let isRenameConversationOpen: Types.ObjectId | null;
	let conversationName: string = '';

	let isLoading = false;

	$: $showLoadingOverlay = isLoading;

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
			isLoading = true;
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
					isLoading = false;
					goto('/');
				}
				conversationsPromise = getConversations();
				deletingConversationID = null;
				isLoading = false;
				return;
			}
			isDeleteModalOpen = false;
			deletingConversationID = null;
			alert('Something went wrong!');
		} catch (err) {
			console.log('error: ', err);
			alert(JSON.stringify(err));
		} finally {
			isLoading = false;
			isDeleteModalOpen = false;
			deletingConversationID = null;
		}
	};

	const renameConversation = async () => {
		try {
			isLoading = true;
			if (conversationName?.length === 0) {
				isLoading = false;
				return;
			}
			const response = await fetch(`/api/conversation/${isRenameConversationOpen}`, {
				method: 'PUT',
				credentials: 'same-origin',
				body: JSON.stringify({
					name: conversationName
				})
			});
			const data = await response.json();
			if (!data.success) {
				console.log(data?.error);
				throw new Error('Unable to delete conversation!');
			}
			if (data?.success) {
				isRenameConversationOpen = null;

				conversationsPromise = getConversations();
				isLoading = false;
				return;
			}
			isRenameConversationOpen = null;
			alert('Something went wrong!');
		} catch (err) {
			console.log('error: ', err);
			alert('error' + err);
		} finally {
			isLoading = false;
			isRenameConversationOpen = null;
			conversationName = '';
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
								isRenameConversationOpen = conversation._id;
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

<Modal
	title="Rename Conversation"
	show={!!isRenameConversationOpen}
	close={() => {
		isRenameConversationOpen = null;
		conversationName = '';
	}}
>
	<div class="text-black px-4">
		<p class="text-xl py-2">New conversation name</p>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="text"
			class="border-b w-full py-2 my-2 border-gray-300 focus:border-blue-500 focus:outline-none px-2"
			placeholder="Enter new name"
			bind:value={conversationName}
			autofocus={true}
			on:keypress={(e) => {
				if (e.key === 'Enter') {
					renameConversation();
				}
			}}
		/>
		<div class="flex justify-start gap-2 py-4">
			<Button
				on:click={() => {
					isRenameConversationOpen = null;
					conversationName = '';
				}}
				size="lg"
				variant="underline">Cancel</Button
			>
			<Button on:click={renameConversation} size="lg">Save</Button>
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
