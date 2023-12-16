<script lang="ts">
	import Button from '$/lib/components/Button/Button.svelte';
	import SendIcon from '$/lib/icons/SendIcon.svelte';
	let prompt = '';

	export let fetchResponse: (prompt: string) => void;

	let chatForm: HTMLFormElement;
	let chat: HTMLTextAreaElement;

	function handleChatSubmit(e: SubmitEvent) {
		chat.style.height = '3rem';
		fetchResponse(prompt);
		prompt = '';
	}

	// Function to handle keydown event
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			// Prevent the default action if only Enter is pressed
			event.preventDefault();
			chatForm.requestSubmit();
		}
	}
</script>

<div class="flex items-end gap-2 pr-6">
	<div
		class="relative flex items-center mt-2 p-1 w-full bg-foreground-2 text-foreground-2-content fill-secondary-content rounded-[28px] shadow-[0px_1px_8px_0px] shadow-black/50 transition-colors"
	>
		<button
			tabindex="-1"
			class="absolute -top-[4px] left-0 right-0 mx-6 h-[10px] cursor-ns-resize focus:outline-none group"
		>
			<div
				class={`absolute top-[4px] h-[1px] w-full bg-text rounded-md opacity-0 group-hover:opacity-100 transition-opacity`}
			/>
		</button>

		<form bind:this={chatForm} on:submit|preventDefault={handleChatSubmit} class="flex w-full">
			<!-- svelte-ignore a11y-autofocus -->
			<textarea
				autofocus
				name="chatbar"
				placeholder="Enter your query"
				bind:this={chat}
				bind:value={prompt}
				on:keydown={handleKeyDown}
				class="p-3 pl-6 min-h-[48px] h-12 text-black w-full bg-transparent resize-none outline-none placeholder:text-[#999999]"
			/>
		</form>

		<Button
			variant="ghost"
			title="Send message"
			on:click={() => {
				chatForm.requestSubmit();
			}}
			class={`h-12 rounded-full ${
				prompt ? 'fill-black data-dark:fill-white' : 'fill-[#999999] pointer-events-none'
			}`}
		>
			<SendIcon class="h-7" />
		</Button>
	</div>
</div>
