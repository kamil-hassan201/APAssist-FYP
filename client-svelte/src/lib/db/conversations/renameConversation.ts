import { ConversationModel } from './model';

export const renameConversationById = async (id: string, name: string) => {
	try {
		const conversation = await ConversationModel.findById(id).exec();

		if (!conversation) {
			return { sucess: false, err: `Unable to find conversation with the ID: ${id}` };
		} else {
			conversation.name = name;
			const newConversation = await conversation.save();
			if (!newConversation) {
				return {
					sucess: false,
					err: `Unable to change the name of conversation with the ID: ${id}`
				};
			} else {
				return { success: true, data: newConversation };
			}
		}
	} catch (err) {
		return { success: false, err: err };
	}
};
