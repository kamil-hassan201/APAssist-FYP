from app.services.query.helpers import simple_index, qa_prompt_template


# create the query engine
simple_query_engine = simple_index.as_query_engine(
    streaming=True, text_qa_template=qa_prompt_template)
