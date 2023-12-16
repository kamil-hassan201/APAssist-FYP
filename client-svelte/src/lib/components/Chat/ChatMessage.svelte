<script>
	export let message = '';
	export let role = 'assistant'; // 'assistant' or 'user'
</script>

<div class={`flex my-2 ${role === 'APAssist' ? 'justify-start' : 'justify-end'}`}>
	<div>
		<div
			class={`
                p-4 rounded-xl text-black data-dark:text-white shadow-[0px_1px_3px_0px] shadow-black/[0.25] max-w-[45rem]
                ${role === 'APAssist' ? ' bg-[#F1F5FF]' : ' bg-[#d1c6c6]'}
            `}
		>
			<p class="flex flex-col gap-4 response-message whitespace-pre-wrap text-sm">
				{message}
			</p>
		</div>
	</div>
</div>
