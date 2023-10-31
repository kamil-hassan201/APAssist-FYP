from flask import Flask
from flask_restful import Api
from app.config import Config

from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    config_class = Config()

    app.config.from_object(config_class)
    return app


# create the app
app = create_app()

# allow cors from all origin
CORS(app, resources={r'/*': {'origins': '*'}})

# create api object
api = Api(app, prefix="/api")
