from flask import Blueprint

index_bp = Blueprint('index', __name__)

from app import views

def register_bp(app):
    app.register_blueprint(index_bp, url_prefix='/')