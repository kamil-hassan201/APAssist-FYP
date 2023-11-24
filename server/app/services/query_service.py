from app.services.query_helpers import simple_query_engine


# function for simple query response
def get_simple_query_response(prompt):
    response = simple_query_engine.query(prompt)
    return response


def get_structured_query_response(prompt):
    response = ''
    return response
