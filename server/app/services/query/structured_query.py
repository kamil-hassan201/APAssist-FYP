from llama_index.response_synthesizers import get_response_synthesizer, ResponseMode
from llama_index.query_engine import RetrieverQueryEngine
from llama_index.vector_stores.types import MetadataInfo, VectorStoreInfo
from llama_index.indices.vector_store.retrievers import (
    VectorIndexAutoRetriever,
)
from app.services.query.helpers import structured_index, qa_prompt_template

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
    streaming=True, response_mode=ResponseMode.COMPACT, text_qa_template=qa_prompt_template)

# create structured query engine
structured_query_engine = RetrieverQueryEngine(
    retriever=structured_retriever,
    response_synthesizer=response_synthesizer,
)
