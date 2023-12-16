from tabnanny import verbose
from llama_index.prompts import PromptTemplate
from llama_index.llms import ChatMessage, MessageRole
from llama_index.chat_engine.context import ContextChatEngine
from llama_index.chat_engine.condense_question import (
    CondenseQuestionChatEngine,
)
from app.services.prompt_templates import condense_question_prompt_template
from app.services.query.simple_query import simple_query_engine
from app.services.query.helpers import simple_index

simple_retriever = simple_index.as_retriever()
condense_question_prompt = PromptTemplate(condense_question_prompt_template)


def chat_query(chat_history, prompt):
    chat_history = chat_history[:-1]
    chat_history = [
        ChatMessage(
            role=MessageRole.ASSISTANT if msg['role'] == 'APAssist' else MessageRole.USER,
            content=msg['message']
        )
        for msg in chat_history
    ]

    chat_engine = ContextChatEngine.from_defaults(
        retriever=simple_retriever,
        chat_history=chat_history,
        verbose=True,
        context_template="You only answer question from the given context. If you don't have any answer in the context, don't give generalized answer. Just reply - 'Unfortunately, I cannot help you with that'",
        system_prompt="You are a student service assistant named APAssist developed by Kamil Hassan. You only answer question from the given context. If you don't have any answer in the context, don't give generalized answer. Just reply - 'Unfortunately, I cannot help you with that'"
    )

    # chat_engine = CondenseQuestionChatEngine.from_defaults(
    #     query_engine=simple_query_engine,
    #     condense_question_prompt=condense_question_prompt,
    #     chat_history=chat_history,
    #     verbose=True
    # )
    streaming_response = chat_engine.stream_chat(prompt)
    return streaming_response
