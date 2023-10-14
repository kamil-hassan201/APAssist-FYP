from flask_restful import Api
from app.controllers.query_controller import Query


def register_routes(api: Api):
    api.add_resource(Query, "/query")
