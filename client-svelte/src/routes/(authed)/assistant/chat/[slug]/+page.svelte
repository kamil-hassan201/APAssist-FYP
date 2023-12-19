<script lang="ts">
	import { PUBLIC_BASE_API_URL } from '$env/static/public';
	import Button from '$/lib/components/Button/Button.svelte';
	import AddIcons from '$/lib/icons/AddIcons.svelte';
	import ChatMessages from '$/lib/components/Chat/ChatMessages.svelte';
	import type { IMessage } from '$/lib/types';
	import { activatedChatTitle, queryType } from '../../assistantStore';
	import { goto } from '$app/navigation';
	import Conversations from '../../Conversations.svelte';

	export let data;
	$: ({ conversation } = data);
	$: $activatedChatTitle = conversation?.name ?? '';

	let streamText: string = '| ';
	let isFetching: boolean = false;

	let messages: IMessage[];
	$: messages = conversation?.chat ?? [];

	async function saveMessageToDB(message: IMessage) {
		try {
			const response = await fetch(`/api/conversation/add-chat`, {
				method: 'POST',
				credentials: 'same-origin',
				body: JSON.stringify({
					id: conversation?._id,
					chat: message
				})
			});

			if (!response.ok) {
				throw new Error('');
			}
		} catch (error) {
			alert(`Error saving the message to database!`);
		}
	}

	async function fetchResponse(prompt: string) {
		const message: IMessage = { role: 'user', message: prompt };
		messages.push(message);
		messages = messages;
		isFetching = true;

		saveMessageToDB(message);

		try {
			const response = await fetch(`${PUBLIC_BASE_API_URL}/query`, {
				method: 'POST',
				headers: {
					Accept: 'text/event-stream',
					'Content-Type': 'application/json'
				},
				credentials: 'same-origin',
				body: JSON.stringify({
					chatMessages: messages,
					queryType: $queryType
				})
			});

			if (!response.ok) {
				alert('Response was not ok!');
			}
			if (response.status == 200 && response.body) {
				isFetching = true;
				const reader = response.body.getReader();

				streamText = '';

				// eslint-disable-next-line no-constant-condition
				while (true) {
					const { done, value } = await reader.read();
					if (done) {
						break;
					}

					// Assuming the stream is sending text data
					const message = new TextDecoder().decode(value);
					streamText += message;
					console.log(streamText);
				}
				saveMessageToDB({ role: 'APAssist', message: streamText });
				isFetching = false;
				messages.push({ role: 'APAssist', message: streamText });
				messages = messages;

				streamText = '| ';
			}
		} catch (error: any) {
			alert(`Something went wrong! ${error.message}`);
		} finally {
			isFetching = false;
		}
	}
</script>

<svelte:head>
	<title>APAssist - Chat</title>
</svelte:head>

<div
	class="grid grid-cols-[minmax(0,_auto)] md:grid-cols-[minmax(0,_auto),_20rem] h-[calc(100vh-4.25rem)]"
>
	<ChatMessages bind:isFetching bind:streamText bind:messages {fetchResponse} />

	<section
		class="z-[1] flex flex-col gap-2 min-h-0 bg-[#303338] border-l border-[#DDD] data-dark:border-[#2A2A2A] overflow-hidden"
	>
		<Button
			on:click={() => {
				goto('/assistant');
			}}
			variant="outline"
			title="New chat"
			class="flex gap-1 m-4 mx-6 mt-3 p-4 text-[#4169E1] text-center border-2 border-[#4169E1] hover:bg-black rounded-full"
		>
			<AddIcons class="w-6 h-6" />
			New chat
		</Button>

		<Conversations />
	</section>
</div>
