from flask import json
import openai
from typing import List
from app.config import configs


# setting the Openai api key
openai.api_key = configs['openai_api_key']


def generate_chat_response(conversation, top_3_courses, studentCharacteristics):
    messages = get_messages(conversation, top_3_courses,
                            studentCharacteristics)

    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages, stream=True, max_tokens=500, temperature=0)
        for line in completion:
            if 'content' in line['choices'][0]['delta']:
                yield line['choices'][0]['delta']['content']

    except Exception as e:
        raise Exception(f"Error creating chat completion: {e}")


def get_messages(conversation: List, top_3_courses: List, studentCharacteristics: str) -> List[dict[str, str]]:
    messages = [
        {
            'role': 'system',
            'content': f"You are a helpful student assistant (APAssist) who is expert in recommending course to students based on their characteristics. You have a student characteristics and 3 course data.\nStudent Characteristics: {studentCharacteristics}\n\nCourse 1 data: {top_3_courses[0]}\nCourse 2 data: {top_3_courses[1]}\nCourse 3 data: {top_3_courses[2]}\n Try to keep your answer within 120 words. Don't exceed that. Don't answer any generalized answer which is out of context. In that case just say that - 'Sorry, I cannot answer that'"
        }
    ]

    for message in conversation:
        newMessage = {}

        newMessage['content'] = message['message']

        if message['sender'] == 'user':
            newMessage['role'] = 'user'
        else:
            newMessage['role'] = 'assistant'

        messages.append(newMessage)

    return messages
