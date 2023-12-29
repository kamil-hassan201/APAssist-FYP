import { ConversationModel } from './model';

export const deleteConversationById = async (id: string) => {
	try {
		const data = await ConversationModel.findByIdAndDelete(id).exec();
		if (data) {
			return { success: true, data: data };
		}
		return { sucess: false, error: `Unable to delete conversation with the ID: ${id}` };
	} catch (err) {
		return { success: false, error: err };
	}
};
