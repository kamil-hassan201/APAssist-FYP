from flask import Flask
from flask_restful import Api
import weaviate
from app.config import Config, configs

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

# connect with weaviate client
try:
    client = weaviate.Client(configs['WEAVIATE_DB_URL'])

    if client.is_ready():
        print("-----------Weaviate cleint is ready!----------")
    else:
        raise Exception("Weaviate client is not ready!")
except:
    raise Exception("Weaviate client couldn't be connected!")
