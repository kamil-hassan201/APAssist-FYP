from typing import List
import openai
import pandas as pd
import pickle
from app.config import configs
from app.services.prompt_templates import template_find_top_course_from_k_nearest
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser
from openai.embeddings_utils import (
    get_embedding,
    distances_from_embeddings,
    indices_of_nearest_neighbors_from_distances,
)


openai.api_key = configs['openai_api_key']


# constants
EMBEDDING_MODEL = "text-embedding-ada-002"
course_characteristics_dataset_path = configs['course_characteristics_dataset_path']

# establish a cache of embeddings to avoid recomputing
# cache is a dict of tuples (text, model) -> embedding, saved as a pickle file

# set path to embedding cache
embedding_cache_path = configs['course_recommendation_vector_cache_path']

# load the cache if it exists, and save a copy to disk
try:
    embedding_cache = pd.read_pickle(embedding_cache_path)
except FileNotFoundError:
    embedding_cache = {}
with open(embedding_cache_path, "wb") as embedding_cache_file:
    pickle.dump(embedding_cache, embedding_cache_file)


# define a function to retrieve embeddings from the cache if present, and otherwise request via the API
def embedding_from_string(
    string: str,
    model: str = EMBEDDING_MODEL,
    embedding_cache=embedding_cache
) -> list:
    """Return embedding of given string, using a cache to avoid recomputing."""
    if (string, model) not in embedding_cache.keys():
        embedding_cache[(string, model)] = get_embedding(string, model)
        with open(embedding_cache_path, "wb") as embedding_cache_file:
            pickle.dump(embedding_cache, embedding_cache_file)
    return embedding_cache[(string, model)]


# define a function to get the embeddings of all the courses
def get_course_embeddings():
    df = pd.read_csv(course_characteristics_dataset_path)
    course_descriptions = df["characteristics"].tolist()

    embeddings = [embedding_from_string(
        string, model=EMBEDDING_MODEL) for string in course_descriptions]
    return embeddings


embeddings = get_course_embeddings()


# define function to get nearest nodes from from the student profile
def get_k_nearest_nodes_indices(
    student_profile: str,
    k: int = 1,
    model=EMBEDDING_MODEL,
) -> list[int]:
    """get the k nearest neighbors of a given string."""

    # get the embedding of the source string
    query_embedding = get_embedding(student_profile, model)
    # get distances between the source embedding and other embeddings (function from embeddings_utils.py)
    distances = distances_from_embeddings(
        query_embedding, embeddings, distance_metric="cosine")

    # get indices of nearest neighbors (function from embeddings_utils.py)
    indices_of_nearest_neighbors = indices_of_nearest_neighbors_from_distances(
        distances)

    return indices_of_nearest_neighbors[:k]


# define function for getting the top course from the nearest k courses

# defining output parser schema
course_number_schema = ResponseSchema(
    name="course_number", type="number", description="the course number which has been chosen - 1 or 2 or 3")
rationale_schema = ResponseSchema(
    name="rationale", type="string", description="100 word Rationale for the recommendation, explaining how the chosen course aligns with the student's interests, career aspirations, and hobbies/free time activities. Use 'You' to me; Use second person narrative style. Start with - 'Based on your characteristics Course - (course title) is the best fit for you....")

response_schemas = [course_number_schema, rationale_schema]
output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
format_instructions = output_parser.get_format_instructions()


def find_top_course_from_k_nearest(all_courses: List[any], student_profile: str, top_k_indices: List[int]):
    selected_courses = [all_courses[i] for i in top_k_indices]

    # discard unimportant keys for evaluation
    keys_to_discard = {"duration", "general_requirements",
                       "english_requirement_for_international_students", "course_fees"}
    selected_courses = [{k: v for k, v in d.items() if k not in keys_to_discard}
                        for d in selected_courses]

    chat = ChatOpenAI(temperature=0.2, model=configs['llm_model'],
                      openai_api_key=configs['openai_api_key'])

    prompt = ChatPromptTemplate.from_template(
        template=template_find_top_course_from_k_nearest)

    query = prompt.format_messages(student_profile=student_profile,
                                   course_1=selected_courses[0],
                                   course_2=selected_courses[1],
                                   course_3=selected_courses[2],
                                   format_instructions=format_instructions)

    response = chat(query)
    output_dict = output_parser.parse(response.content)
    return output_dict
