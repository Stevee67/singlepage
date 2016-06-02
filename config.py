import secret_data
from app.tools import database_uri
import os

class Config:
    DB_HOST = secret_data.DB_HOST
    DB_USER = secret_data.DB_USER
    DB_PASS = secret_data.DB_PASS
    DB_NAME = secret_data.DB_NAME
    DB_PORT = 5432
    if os.environ.get('OPENSHIFT_REPO_DIR'):
        DB_USER = os.environ.get('OPENSHIFT_POSTGRESQL_DB_USERNAME')
        DB_HOST = os.environ.get('OPENSHIFT_POSTGRESQL_DB_HOST')
        DB_PASS = os.environ.get('OPENSHIFT_POSTGRESQL_DB_PASSWORD')
        DB_PORT = int(os.environ.get('OPENSHIFT_POSTGRESQL_DB_PORT'))
    SITE_TITLE = ''
    DATABASE_URI = \
        database_uri(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT)

    PORT = os.environ.get('OPENSHIFT_PYTHON_PORT') or 8888
    HOST = os.environ.get('OPENSHIFT_PYTHON_IP') or '0.0.0.0'
    DEBUG = True
    SECRET_KEY = secret_data.SECRET_KEY
