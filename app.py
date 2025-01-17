import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from src.blueprints import BlueprintHealth, BlueprintSecret, BlueprintClave
from db import db
from src.modelo.declarative_base import init_db

API_PREFIX = '/api/caja'

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.sqlite')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['PROPAGATE_EXCEPTIONS'] = True
    app.config["JWT_SECRET_KEY"] = os.environ['JWT_SECRET_KEY']

    CORS(app)
    JWTManager(app)

    db.init_app(app)

    with app.app_context():
        init_db(db.engine)

    app.register_blueprint(BlueprintHealth, url_prefix=API_PREFIX)
    app.register_blueprint(BlueprintSecret, url_prefix=API_PREFIX)
    app.register_blueprint(BlueprintClave, url_prefix=API_PREFIX)

    return app
