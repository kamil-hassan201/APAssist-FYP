import { ConversationModel } from './model';
import type { IConversation } from '$/lib/types';

export const createConversation = async (conversation: IConversation) => {
	try {
		const newConversation = new ConversationModel(conversation);
		const savedConversation = await newConversation.save();
		return {
			success: true,
			conversation: savedConversation
		};
	} catch (err) {
		console.error('Error saving conversation:', err);
		return {
			success: false,
			error: err
		};
	}
};
