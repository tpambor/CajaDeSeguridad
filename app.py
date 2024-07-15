from flask import Flask
import flask_smorest
from src.blueprints import BlueprintHealth


class CajaDeSeguridadApi(flask_smorest.Api):
    DEFAULT_ERROR_RESPONSE_NAME = None


def create_app():
    app = Flask(__name__)
    app.config['API_TITLE'] = 'Cloud Conversion Tool API'
    app.config['API_VERSION'] = 'v1'
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

    api = CajaDeSeguridadApi(app)
    api.register_blueprint(BlueprintHealth)

    return app
