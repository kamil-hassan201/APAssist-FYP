import { ConversationModel } from './model';

export const getConversationById = async (id: string) => {
	try {
		const conversation = await ConversationModel.findById(id).exec();
		return { success: true, data: conversation };
	} catch (err) {
		return { success: false, err: err };
	}
};
