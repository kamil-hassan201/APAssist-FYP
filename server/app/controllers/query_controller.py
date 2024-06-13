from flask import Response, json, request, stream_with_context
from flask_restful import Resource
from app.services.query import get_chat_response, get_simple_query_response, get_structured_query_response


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
        chatMessages = body.get('chatMessages', None)

        if chatMessages is None:
            response = Response(response=json.dumps(
                data), status=400, mimetype='application/json')
            return response

        prompt = chatMessages[-1]['message']

        query_type = body.get('queryType', 'simple')

        # Check if prompt is None, which would indicate that parsing failed
        if prompt is None:
            data = {
                "status": "error",
                "message": "No prompt given"
            }
            response = Response(response=json.dumps(
                data), status=400, mimetype='application/json')
            return response

        if query_type == 'structured':
            response = get_structured_query_response(prompt).response_gen
        elif query_type == 'simple':
            response = get_simple_query_response(prompt).response_gen
        else:
            response = get_chat_response(chatMessages, prompt).response_gen

        # return streaming response
        return Response(stream_with_context(response), status=200)
