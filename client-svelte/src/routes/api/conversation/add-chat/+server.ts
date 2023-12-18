import { addChatToConversation } from '$/lib/db/conversations/addChatToConversation.js';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { id, chat } = await request.json();

	const response = await addChatToConversation(id, chat);
	if (response.success) {
		error(400, 'Unable to save the chat to the conversation');
	}
	return json(response);
}
