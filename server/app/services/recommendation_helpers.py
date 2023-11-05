import openai
import pandas as pd
import pickle
from app.config import configs
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
