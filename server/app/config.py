import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    DEBUG = False


configs = {
    "port": os.getenv('PORT'),
    "openai_api_key": os.getenv('OPENAI_API_KEY'),
    "course_characteristics_dataset_path": "data/course_characteristics.csv",
    "all_courses_path": "data/all_courses.json",
    "course_recommendation_vector_cache_path": "vector_db/recommendation/course_recommendations_embeddings_cache.pkl",
    "knowledge_base_vector_db_path": "vector_db/knowledge_base/index_data",
    "llm_model": "gpt-3.5-turbo"
}
