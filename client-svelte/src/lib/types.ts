import type { Types } from 'mongoose';

export interface RecommendationProps {
	student_profile: string;
	student_statement: string;
	course_type: string;
}
export interface IMessage {
	message: string;
	role: 'APAssist' | 'user';
}
export interface IConversation {
	_id: Types.ObjectId;
	name: string;
	userEmail: string;
	chat: IMessage[];
}

export type TQueryType = 'chat' | 'simple' | 'structured';
