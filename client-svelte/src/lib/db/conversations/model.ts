import type { IConversation, IMessage } from '$/lib/types';
import mongoose, { Schema } from 'mongoose';

const MessageSchema: Schema = new Schema<IMessage>({
	message: { type: String, required: true },
	role: { type: String, required: true, enum: ['APAssist', 'user'] }
});

const ConversationSchema: Schema = new Schema<IConversation>({
	_id: { type: Schema.Types.ObjectId, required: true },
	name: { type: String, required: true },
	userEmail: { type: String, required: true },
	chat: { type: [MessageSchema], default: [] }
});

export const ConversationModel = mongoose.model<IConversation>('Conversation', ConversationSchema);
