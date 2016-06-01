import secret_data
from app.tools import database_uri
import os

class Config:
    DB_HOST = secret_data.DB_HOST
    DB_USER = secret_data.DB_USER
    DB_PASS = secret_data.DB_PASS
    DB_NAME = secret_data.DB_NAME
    if os.environ.get('OPENSHIFT_REPO_DIR'):
        DB_USER = os.environ.get('OPENSHIFT_POSTGRESQL_DB_USERNAME')
        DB_HOST = os.environ.get('OPENSHIFT_POSTGRESQL_DB_HOST')
        DB_PASS = os.environ.get('OPENSHIFT_POSTGRESQL_DB_PASSWORD')
        DB_NAME = os.environ.get('OPENSHIFT_POSTGRESQL_DB_NAME')
    SITE_TITLE = ''

    DATABASE_URI = \
        database_uri(secret_data.DB_HOST, secret_data.DB_USER, secret_data.DB_PASS, secret_data.DB_NAME)
    PORT = 8888
    HOST = '0.0.0.0'
    DEBUG = True
    SECRET_KEY = secret_data.SECRET_KEY