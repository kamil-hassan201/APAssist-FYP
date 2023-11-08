from flask import Response, json, request, stream_with_context
from flask_restful import Resource
from app.services.query_service import get_query_response
from app.services.recommendation_service import get_course_recommendation


class Recommendation(Resource):
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
        student_profile = body.get('student_profile', None)

        # Check if prompt is None, which would indicate that parsing failed
        if student_profile is None:
            data = {
                "status": "error",
                "message": "No student profile given"
            }
            response = Response(response=json.dumps(
                data), status=400, mimetype='application/json')
            return response

        data = get_course_recommendation(student_profile)

        response = {
            "data": data
        }

        # Convert the Python dictionary to a JSON string
        response_json = json.dumps(response)

        # Return the response with content type as JSON
        return Response(response_json, status=200, content_type='application/json')
