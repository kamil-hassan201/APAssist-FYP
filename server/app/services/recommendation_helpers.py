from typing import List
import openai
from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.output_parsers import CommaSeparatedListOutputParser
from langchain.prompts import PromptTemplate
from app.config import configs
from app.services.prompt_templates import template_find_top_course_from_k_nearest, template_find_top_3_with_student_statement
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import StructuredOutputParser, CommaSeparatedListOutputParser, ResponseSchema
from openai.embeddings_utils import (
    get_embedding,
    distances_from_embeddings,
    indices_of_nearest_neighbors_from_distances,
)
from app import client as wv_client


openai.api_key = configs['openai_api_key']


# define function for getting the top course from the nearest k courses

def find_top_course_from_k_nearest(all_courses: List[any], student_profile: str, top_k_indices: List[int]):

    # defining output parser schema
    course_number_schema = ResponseSchema(
        name="course_number", type="number", description="the course number which has been chosen - 1 or 2 or 3")
    rationale_schema = ResponseSchema(
        name="rationale", type="string", description="100 word Rationale for the recommendation, explaining how the chosen course aligns with the student's interests, career aspirations, and hobbies/free time activities. Use 'You' to me; Use second person narrative style. Start with - 'Based on your characteristics Course - (course title) is the best fit for you....")

    response_schemas = [course_number_schema, rationale_schema]
    output_parser = StructuredOutputParser.from_response_schemas(
        response_schemas)
    format_instructions = output_parser.get_format_instructions()

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


# function for getting top 3 from top 5 courses with importance on student statement
def get_top_3_from_top_5_courses(student_statement, course_info_with_characteristics):

    indices_schema = ResponseSchema(
        name="indices", type="list", description="A python list of course numbers (index). For example, if you have chosen course number 2, course number 4 and course number 5 - the output should be - [2, 4, 5].")

    response_schemas = [indices_schema]
    output_parser = StructuredOutputParser.from_response_schemas(
        response_schemas)
    format_instructions = output_parser.get_format_instructions()

    # Remove 'index' key from each dictionary in the list
    courses = [{k: v for k, v in d.items() if k != 'index'}
               for d in course_info_with_characteristics]

    chat = ChatOpenAI(temperature=0.2, model=configs['llm_model'],
                      openai_api_key=configs['openai_api_key'])

    prompt = ChatPromptTemplate.from_template(
        template=template_find_top_3_with_student_statement)

    query = prompt.format_messages(course_1=courses[0], course_2=courses[1],
                                   course_3=courses[2], course_4=courses[3], course_5=courses[4], student_statement=student_statement, format_instructions=format_instructions)
    response = chat(query)
    output_dict = output_parser.parse(response.content)

    selected_top_3 = output_dict['indices']

    try:
        top_3_indices = [int(course_info_with_characteristics[int(i) - 1]['index'])
                         for i in selected_top_3]
    except:
        raise Exception("Couldn't Retrieve top 3 courses!")

    return top_3_indices


# function for getting top K nearest courses with student profile
def get_top_k_courses_with_characteristics(student_profile: str, course_type: str, k=5):
    response = (
        wv_client.query
        .get("CourseCharacteristics", ["course_title", "relevant_student_profile", "index"])
        .with_where({
            "path": ["course_type"],
            "operator": "Equal",
            "valueText": course_type
        })
        .with_near_text({"concepts": f"relevant_student_profile: {student_profile}"})
        .with_limit(k)
        .do()
    )

    return response['data']['Get']['CourseCharacteristics']
