import os
import datetime
from flask import Flask
from flask_jwt_extended import JWTManager, create_access_token
from blueprints import BlueprintHealth, BlueprintLogin
from db import db

API_PREFIX = '/api/auth'

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.sqlite')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['PROPAGATE_EXCEPTIONS'] = True
    app.config["JWT_SECRET_KEY"] = os.environ['JWT_SECRET_KEY']
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(hours=4)

    JWTManager(app)

    db.init_app(app)
    with app.app_context():
        db.create_all()

    app.register_blueprint(BlueprintHealth, url_prefix=API_PREFIX)
    app.register_blueprint(BlueprintLogin, url_prefix=API_PREFIX)

    return app
