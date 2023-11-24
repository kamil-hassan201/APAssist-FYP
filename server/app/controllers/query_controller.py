from flask import Response, json, request, stream_with_context
from flask_restful import Resource
from app.services.query_service import get_simple_query_response, get_structured_query_response


class Query(Resource):
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
        prompt = body.get('prompt', None)

        # Check if prompt is None, which would indicate that parsing failed
        if prompt is None:
            data = {
                "status": "error",
                "message": "No prompt given"
            }
            response = Response(response=json.dumps(
                data), status=400, mimetype='application/json')
            return response

        response = get_structured_query_response(prompt).response_gen

        # return streaming response
        return Response(stream_with_context(response), status=200)
