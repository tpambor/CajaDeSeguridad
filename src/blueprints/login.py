from flask import Response, request, jsonify
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import create_access_token
import os

blp_login = Blueprint("Login", __name__, url_prefix="/")

@blp_login.route("/login")
class VistaLogin(MethodView):
    def post(self):
        if request.method == 'POST':
            data = request.json
            email = data.get('email')
            password = data.get('password')
            if email != 'admin' or password != 'admin':
                return jsonify({"message": "Invalid credentials"}), 401
            access_token = create_access_token(identity=email)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"message": "Method not allowed"}), 405
    
    
    