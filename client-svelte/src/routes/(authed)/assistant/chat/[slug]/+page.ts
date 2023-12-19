import type { IConversation } from '$/lib/types.js';
import { redirect } from '@sveltejs/kit';
import AssistantTitlebar from '../../AssistantTitlebar.svelte';

export async function load({ params, fetch }) {
	const getConversation = async () => {
		try {
			const response = await fetch(`/api/conversation/${params.slug}`, {
				credentials: 'same-origin'
			});
			const data = await response.json();
			console.log('data', data);
			return data.data as IConversation;
		} catch (err) {
			redirect(300, '/');
		}
	};

	return {
		conversation: getConversation(),
		title: AssistantTitlebar
	};
}
