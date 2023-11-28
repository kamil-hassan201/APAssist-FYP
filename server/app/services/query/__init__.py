from app.services.query.simple_query import simple_query_engine
from app.services.query.structured_query import structured_query_engine
from app.services.query.chat_query import chat_query


# function for simple query response
def get_simple_query_response(prompt):
    response = simple_query_engine.query(prompt)
    return response


# function for structured query response
def get_structured_query_response(prompt):
    response = structured_query_engine.query(prompt)
    return response


# function for chat response
def get_chat_response(chatMessages, prompt):
    response = chat_query(chat_history=chatMessages, prompt=prompt)
    return response
