from llama_index import SimpleDirectoryReader, VectorStoreIndex
import openai

from app.config import configs


openai.api_key = configs['openai_api_key']


documents = SimpleDirectoryReader("./data").load_data()

# Create an index from the document (Vector Embedding)
index = VectorStoreIndex.from_documents(documents)

# save the index
index.storage_context.persist(configs['simple_knowledge_base_vector_db_path'])

print("--------Simple database created!----------")
