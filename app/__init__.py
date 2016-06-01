from flask import Flask, g, request
from config import Config
from app.blueprints import register_bp
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask.ext.login import LoginManager, current_user
from .models import Users

app = Flask(__name__)
login_manager = LoginManager()

def create_app():
    app.config.from_object(Config())
    app.secret_key = Config.SECRET_KEY
    register_bp(app)
    app.before_request(load_database(app.config['DATABASE_URI']))
    app.teardown_request(close_database)
    login_manager.init_app(app)
    return app


def load_database(db_config):
    def load_db():
        db_session = db_session_func(db_config)
        g.db = db_session
    return load_db

def close_database(exception):
    db = getattr(g, 'db', None)
    sql_connection = getattr(g, 'sql_connection', None)
    if sql_connection:
        sql_connection.close()
    if db is not None:
        if exception:
            db.rollback()
        else:
            db.commit()
            db.close()

@login_manager.user_loader
def load_user(id):
    print(id)
    user = g.db.query(Users).filter_by(id=int(id)).first()
    g.user = user
    return user




def db_session_func(db_config):
    engine = create_engine(db_config)
    g.sql_connection = engine.connect()
    db_session = scoped_session(sessionmaker(autocommit=False,
                                             autoflush=False,
                                             bind=engine))
    return db_session
