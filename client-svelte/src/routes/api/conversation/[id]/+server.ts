import { deleteConversationById } from '$/lib/db/conversations/deleteConversation.js';
import { getConversationById } from '$/lib/db/conversations/getConversation.js';
import { renameConversationById } from '$/lib/db/conversations/renameConversation.js';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const data = await getConversationById(params.id);
	if (!data.success) {
		error(400, 'Unable to save the chat to the conversation');
	}
	return json(data);
}

export async function DELETE({ params }) {
	const data = await deleteConversationById(params.id);
	if (!data.success) {
		error(400, 'Unable to delete the chat to the conversation');
	}
	return json(data);
}

export async function PUT({ params, request }) {
	const { name } = await request.json();

	if (!name) {
		error(400, 'Need to pass in new name');
	}

	const data = await renameConversationById(params.id, name);
	if (!data.success) {
		error(400, 'Unable to save the chat to the conversation');
	}
	return json(data);
}
