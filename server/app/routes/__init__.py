from flask_restful import Api
from app.controllers.query_controller import Query
from app.controllers.recommendation_controller import Recommendation


def register_routes(api: Api):
    api.add_resource(Query, "/query")
    api.add_resource(Recommendation, "/recommendation")
