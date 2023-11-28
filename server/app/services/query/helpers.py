
from llama_index import Prompt, StorageContext, load_index_from_storage
from app.config import configs
from llama_index import VectorStoreIndex
from llama_index.vector_stores import WeaviateVectorStore
from app import client
from app.services.prompt_templates import context_query_template


simple_index = None
structured_index = None


# initialize indexes
def initialize_query_index():
    print("------Initializing indexes-----")
    global simple_index
    global structured_index

    storage_context = StorageContext.from_defaults(
        persist_dir=configs['simple_knowledge_base_vector_db_path'])

    simple_index = load_index_from_storage(storage_context)

    # retrieve structured vector store
    structured_vector_store = WeaviateVectorStore(
        weaviate_client=client, index_name=configs['structured_index_name']
    )

    structured_index = VectorStoreIndex.from_vector_store(
        structured_vector_store)


initialize_query_index()

qa_prompt_template = Prompt(context_query_template)
