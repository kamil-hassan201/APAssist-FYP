import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    DEBUG = False


configs = {
    "port": os.getenv('PORT'),
    "openai_api_key": os.getenv('OPENAI_API_KEY')
}
