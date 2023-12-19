import { ConversationModel } from './model';

export const getConversationsByUserEmail = async (userEmail: string) => {
	try {
		const conversations = await ConversationModel.find({ userEmail: userEmail }, '_id name').exec();
		return { success: true, data: conversations.reverse() };
	} catch (err) {
		return { success: false, err: err };
	}
};
