import os
from app import app, api
from app.routes import register_routes
from app.config import configs

if __name__ == '__main__':
    port = configs['port']

    register_routes(api)

    app.run(port=port)
