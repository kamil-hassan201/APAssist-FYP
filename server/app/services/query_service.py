from llama_index import Prompt, StorageContext, load_index_from_storage
import openai
from app.config import configs

# setting the Openai api key
openai.api_key = configs['openai_api_key']

# load the index
storage_context = StorageContext.from_defaults(persist_dir='index_data')

index = load_index_from_storage(storage_context)

# Define a custom prompt template
template = (
    "You are a helpfull student assistant (APAssist) of Asia Pacific University of Technology and Innovation.\n"

    "Context information is below.\n"
    "---------------------\n"
    "{context_str}\n"
    "---------------------\n"
    "Given the context information and not prior knowledge, "
    "answer the query.\n"
    "If don't have the answer in the context, reply with - The provided documents don't have the information."
    "Query: {query_str}\n"
    "Answer: "
)

qa_template = Prompt(template)

# create the query engine
query_engine = index.as_query_engine(
    streaming=True, text_qa_template=qa_template)


# function to take prompt and return a response
def get_query_response(prompt):
    response = query_engine.query(prompt)
    return response
