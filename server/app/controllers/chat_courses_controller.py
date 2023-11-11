from flask import Response, json, request, stream_with_context
from flask_restful import Resource
from app.services.chat_courses_service import generate_chat_response


class ChatCourses(Resource):
    def post(self):
        # Get the JSON data from the request
        body = request.get_json()

        # Check if data is None, which would indicate that parsing failed
        if body is None:
            data = {
                "status": "error",
                "message": "Invalid JSON"
            }
            response = Response(response=json.dumps(
                data), status=400, mimetype='application/json')
            return response

        # Access prompt in the data by key
        conversation = body.get('conversation', None)
        top_3_courses = body.get('top_3_courses', None)
        studentCharacteristics = body.get('studentCharacteristics', None)

        # Check if prompt is None, which would indicate that parsing failed
        if any(item is None for item in [conversation, top_3_courses, studentCharacteristics]):
            data = {
                "status": "error",
                "message": "Data is missing"
            }
            response = Response(response=json.dumps(
                data), status=400, mimetype='application/json')
            return response

        # Convert the Python dictionary to a JSON string
        # response_json = json.dumps(response)

        # Return the response with content type as JSON
        # return Response(response_json, status=200, content_type='application/json')
        return Response(stream_with_context(generate_chat_response(
            conversation, top_3_courses, studentCharacteristics)), status=200, mimetype='text/event-stream')
