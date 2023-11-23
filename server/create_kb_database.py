import openai
import pandas as pd
import weaviate

from llama_index import VectorStoreIndex

from llama_index.storage.storage_context import StorageContext
from llama_index.vector_stores import WeaviateVectorStore
from llama_index.schema import TextNode
from app.config import configs


openai.api_key = configs['openai_api_key']

df = pd.read_csv(configs['kb_path'])

nodes = []

for index, row in df.iterrows():
    node = TextNode(
        text=(f"Topic: {row['question']} \n \n Details: {row['answer']}"),
        metadata={
            "user_query": row['question'],
            "category": row['category'],
        },
    )

    nodes.append(node)

# connect with weaviate client
client = weaviate.Client(configs['WEAVIATE_DB_URL'])

if client.is_ready():
    print("Weaviate cleint is ready!")
else:
    raise Exception("Weaviate client couldn't be connected!")


# Creating Vector Store
vector_store = WeaviateVectorStore(
    weaviate_client=client, index_name="KnowledgeBase"
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

index = VectorStoreIndex(nodes, storage_context=storage_context)
