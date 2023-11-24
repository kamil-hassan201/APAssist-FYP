from llama_index import Prompt, StorageContext, load_index_from_storage
from app.config import configs
from app.services.prompt_templates import index_query_template

# load the index
storage_context = StorageContext.from_defaults(
    persist_dir=configs['simple_knowledge_base_vector_db_path'])

simple_index = load_index_from_storage(storage_context)


simple_qa_template = Prompt(index_query_template)

# create the query engine
simple_query_engine = simple_index.as_query_engine(
    streaming=True, text_qa_template=simple_qa_template)
