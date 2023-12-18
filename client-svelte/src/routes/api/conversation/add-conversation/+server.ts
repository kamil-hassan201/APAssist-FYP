import { createConversation } from '$/lib/db/conversations/addConversation.js';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { conversation } = await request.json();

	const response = await createConversation(conversation);
	if (response.success) {
		error(400, 'Unable to create new conversation.');
	}
	return json(response);
}
