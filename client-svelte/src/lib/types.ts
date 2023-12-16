export interface Message {
	message: string;
	role: 'APAssist' | 'user';
}

export interface RecommendationProps {
	student_profile: string;
	student_statement: string;
	course_type: string;
}
