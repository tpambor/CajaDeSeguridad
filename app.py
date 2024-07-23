import os
from flask import Flask
from src.blueprints import BlueprintHealth, BlueprintSecret
from db import db
from src.modelo.declarative_base import init_db


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.sqlite')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['PROPAGATE_EXCEPTIONS'] = True

    db.init_app(app)

    with app.app_context():
        init_db(db.engine)

    app.register_blueprint(BlueprintHealth, url_prefix='/api/caja')
    app.register_blueprint(BlueprintSecret, url_prefix='/api/caja')

    return app
