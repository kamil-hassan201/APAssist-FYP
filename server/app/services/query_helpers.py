from llama_index.response_synthesizers import get_response_synthesizer, ResponseMode
from llama_index.query_engine import RetrieverQueryEngine
from llama_index.vector_stores.types import MetadataInfo, VectorStoreInfo
from llama_index.indices.vector_store.retrievers import (
    VectorIndexAutoRetriever,
)
from llama_index import Prompt, StorageContext, load_index_from_storage
from app.config import configs
from app.services.prompt_templates import index_query_template
from llama_index import VectorStoreIndex
from llama_index.vector_stores import WeaviateVectorStore
from app import client

# load the index
storage_context = StorageContext.from_defaults(
    persist_dir=configs['simple_knowledge_base_vector_db_path'])

simple_index = load_index_from_storage(storage_context)


simple_qa_template = Prompt(index_query_template)

# create the query engine
simple_query_engine = simple_index.as_query_engine(
    streaming=True, text_qa_template=simple_qa_template)


# retrieve structured vector store
structured_vector_store = WeaviateVectorStore(
    weaviate_client=client, index_name=configs['structured_index_name']
)

structured_index = VectorStoreIndex.from_vector_store(structured_vector_store)

# declaring schema for Structured vector store
structured_vector_store_info = VectorStoreInfo(
    content_info="Detailed answer of a certain topic/query in the context of a University services.",
    metadata_info=[
        MetadataInfo(
            name="user_query",
            type="str",
            description=(
                "The User Query - the question asked by the user."
            ),
        ),
        MetadataInfo(
            name="category",
            type="str",
            description=("""
                    Category of the question, one of [Library, Academic_Administration, VisaOrImmigration, IT_Helpdesk, Bursary, Logistic_and_Operation] \n
                            Example for each of the category:
                            I want to remove/delete a paper from Turnitin. What should I do? -> Library; \n
                            What are the documents needed to support my EC? -> Academic_Administration; \n
                            what is the procedure of Transfer of Endorsement? -> VisaOrImmigration; \n
                            How to find out if a lab or classroom is free? -> IT_Helpdesk; \n
                            How can I pay for Laundry at accomodation? -> IT_Helpdesk; \n
                            How to make payment via Flywire? -> Bursary; \n
                            How to check my fee payment details on APSpace? -> IT_Helpdesk; \n
                            what is APIIT Car Park – Zone G? -> Logistic_and_Operation; \n
                            Anything related to APCard or APKey -> IT_Helpdesk
                """
                         ),
        ),

    ],
)

# create chunks retriever
structured_retriever = VectorIndexAutoRetriever(
    structured_index, vector_store_info=structured_vector_store_info, similarity_top_k=3
)

# configure response synthesizer
response_synthesizer = get_response_synthesizer(
    streaming=True, response_mode=ResponseMode.COMPACT, text_qa_template=simple_qa_template)

# create structured query engine
structured_query_engine = RetrieverQueryEngine(
    retriever=structured_retriever,
    response_synthesizer=response_synthesizer,
)
