import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    DEBUG = False


configs = {
    "port": os.getenv('PORT'),
    "openai_api_key": os.getenv('OPENAI_API_KEY'),
    'WEAVIATE_DB_URL': os.getenv('WEAVIATE_DB_URL'),
    "course_characteristics_dataset_path": "data/course_characteristics.csv",
    "all_courses_path": "data/all_courses.json",
    "kb_path": "data/kb.csv",
    "course_recommendation_vector_cache_path": "vector_db/recommendation/course_characteristics_embeddings_cache.pkl",
    "simple_knowledge_base_vector_db_path": "vector_db/knowledge_base/index_data",
    "llm_model": "gpt-3.5-turbo",
    "structured_index_name": 'KnowledgeBase'
}
