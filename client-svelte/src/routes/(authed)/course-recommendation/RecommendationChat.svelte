<script lang="ts">
	import ChatMessages from '$/lib/components/Chat/ChatMessages.svelte';
	import type { IMessage } from '$/lib/types';
	import { PUBLIC_BASE_API_URL } from '$env/static/public';

	export let studentCharacteristics: string;
	export let courseInfo: { rationale: string; top_3_courses: any[] };

	let isFetching: boolean = false;
	let streamText: string = '| ';
	let messages: IMessage[] = [
		{
			message: `Top 3 courses that best match to your profile are ${courseInfo.top_3_courses
				.map((course) => course.course_title)
				.join(', ')}`,
			role: 'APAssist'
		},
		{
			message: 'Among them which one best fit me?',
			role: 'user'
		},
		{
			message: courseInfo.rationale,
			role: 'APAssist'
		},
		{
			message: 'You can ask any further question about this 3 courses!',
			role: 'APAssist'
		}
	];

	async function fetchResponse(prompt: string) {
		messages.push({ role: 'user', message: prompt });
		messages = messages;
		isFetching = true;

		try {
			const response = await fetch(`${PUBLIC_BASE_API_URL}/chat-courses`, {
				method: 'POST',
				headers: {
					Accept: 'text/event-stream',
					'Content-Type': 'application/json'
				},
				credentials: 'same-origin',
				body: JSON.stringify({
					conversation: messages,
					top_3_courses: courseInfo.top_3_courses,
					studentCharacteristics: studentCharacteristics
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

<ChatMessages bind:isFetching bind:streamText bind:messages {fetchResponse} />
