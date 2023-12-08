import json
from app.config import configs
from app.services.recommendation_helpers import find_top_course_from_k_nearest, get_top_3_from_top_5_courses, get_top_k_courses_with_characteristics

all_courses_path = configs['all_courses_path']
with open(all_courses_path, 'r') as file:
    all_courses = json.load(file)


def get_course_recommendation(student_profile: str, student_statement: str, course_type: str):
    # First Layer (To get top 5 courses)
    if student_statement:
        nearest_k_courses_with_characteristics = get_top_k_courses_with_characteristics(
            student_profile=student_profile, course_type=course_type, k=5)
        # Second Layer (To get top 3 courses)
        indices_nearest_nodes = get_top_3_from_top_5_courses(
            student_statement=student_statement, course_info_with_characteristics=nearest_k_courses_with_characteristics)
    else:
        nearest_k_courses_with_characteristics = get_top_k_courses_with_characteristics(
            student_profile=student_profile, course_type=course_type, k=3)

        indices_nearest_nodes = [int(course['index'])
                                 for course in nearest_k_courses_with_characteristics]

    top_3_courses = [all_courses[i] for i in indices_nearest_nodes]

    # Third Layer (To get best match course)
    course_info = find_top_course_from_k_nearest(
        all_courses, student_profile, indices_nearest_nodes)

    data = {
        "rationale": course_info['rationale'],
        "top_3_courses": top_3_courses
    }

    return data
