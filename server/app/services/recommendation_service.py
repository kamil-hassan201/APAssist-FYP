import json
from typing import List
from app.config import configs
from app.services.recommendation_helpers import find_top_course_from_k_nearest, get_k_nearest_nodes_indices

all_courses_path = configs['all_courses_path']
with open(all_courses_path, 'r') as file:
    all_courses = json.load(file)


def get_course_recommendation(student_profile: str):
    indices_nearest_nodes = get_k_nearest_nodes_indices(
        student_profile=student_profile, k=3)

    top_3_course_title = [all_courses[i]['course_title']
                          for i in indices_nearest_nodes]

    course_info = find_top_course_from_k_nearest(
        all_courses, student_profile, indices_nearest_nodes)

    course_info['top_3_course'] = top_3_course_title

    return course_info
