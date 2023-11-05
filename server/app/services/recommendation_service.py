import json
from app.config import configs
from app.services.recommendation_helpers import get_k_nearest_nodes_indices

all_courses_path = configs['all_courses_path']
with open(all_courses_path, 'r') as file:
    all_courses = json.load(file)


def get_course_recommendation(student_profile: str):
    indices_nearest_nodes = get_k_nearest_nodes_indices(
        student_profile=student_profile, k=3)

    return all_courses[indices_nearest_nodes[0]]
