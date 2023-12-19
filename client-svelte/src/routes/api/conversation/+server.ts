import { getConversationsByUserEmail } from '$/lib/db/conversations/getConversations.js';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const userEmail = url.searchParams.get('userEmail') ?? '';

	if (!userEmail) {
		error(400, 'Need user email to fetch conversations!');
	}

	const response = await getConversationsByUserEmail(userEmail);
	if (!response.success) {
		error(400, 'Unable to save the chat to the conversation');
	}
	return json(response);
}
