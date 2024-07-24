import os
from flask import Flask
import flask_smorest
from flask_cors import CORS
from src.blueprints import BlueprintHealth, BlueprintLogin
from db import db
from src.modelo.declarative_base import init_db
from flask_jwt_extended import jwt_required, JWTManager

class CajaDeSeguridadApi(flask_smorest.Api):
    DEFAULT_ERROR_RESPONSE_NAME = None


def create_app():
    app = Flask(__name__)
    # Configurar CORS
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})
    jwt_secret_key = os.environ.get('JWT_SECRET_KEY', 'default_secret_key')
    if jwt_secret_key == 'default_secret_key':
        print("WARNING: JWT_SECRET_KEY not set. Using default secret key.")
    app.config["JWT_SECRET_KEY"] = jwt_secret_key
    jwt = JWTManager(app)
    app.config['API_TITLE'] = 'Cloud Conversion Tool API'
    app.config['API_VERSION'] = 'v1'
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.sqlite')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['OPENAPI_VERSION'] = '3.1.0'
    app.config['OPENAPI_URL_PREFIX'] = '/'
    app.config['OPENAPI_SWAGGER_UI_PATH'] = '/swagger-ui'
    app.config['OPENAPI_SWAGGER_UI_URL'] = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/'
    app.config['API_SPEC_OPTIONS'] = {
        "components": {
            "securitySchemes": {
                "Bearer Auth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            }
        }
    }
    app.config['PROPAGATE_EXCEPTIONS'] = True

    db.init_app(app)

    with app.app_context():
        init_db(db.engine)

    api = CajaDeSeguridadApi(app)
    api.register_blueprint(BlueprintHealth)
    api.register_blueprint(BlueprintLogin)

    return app
