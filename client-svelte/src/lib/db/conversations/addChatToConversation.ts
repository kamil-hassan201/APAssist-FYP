import type { IMessage } from '$/lib/types';
import { ConversationModel } from './model';

export const addChatToConversation = async (id: string, chat: IMessage) => {
	try {
		const conversation = await ConversationModel.findById(id).exec();
		if (conversation) {
			conversation?.chat.push(chat);
			const doc = await conversation?.save();
			if (doc) {
				console.log('Chat added to the Conversation!');
				return {
					success: true,
					id: doc._id
				};
			} else {
				return {
					success: false,
					error: 'Unable to save the chat!'
				};
			}
		} else {
			return {
				success: false,
				error: 'Unable to find conversation with the id'
			};
		}
	} catch (err) {
		console.error('Error adding to conversation:', err);

		return {
			success: false,
			error: err
		};
	}
};
