import json
from json.decoder import JSONDecodeError
from flask import Blueprint, Response, request
from flask.views import MethodView
from flask_jwt_extended import create_access_token
from .util import class_route
from db import db
from models import User
from password import passwordhash_from_plaintext

blp = Blueprint("Login", __name__)

@class_route(blp, "/login")
class VistaLogin(MethodView):
    init_every_request = False

    def response_error(self, err):
        return Response(err, status=422, mimetype='text/plain')

    def response_auth_failure(self):
        return Response('Usuario no existe', status=404, mimetype='text/plain')

    def post(self):
        try:
            req = json.loads(request.data)
        except JSONDecodeError:
            return self.response_error('JSON inválido')

        if 'email' not in req:
            return self.response_error('email is requerido')

        if 'password' not in req:
            return self.response_error('password is requerido')

        user = db.session.query(User).filter_by(email=req['email']).first()
    
        if user is None:
            return self.response_auth_failure()
        
        password_hashed = passwordhash_from_plaintext(req['password'], user.salt)
        
        if password_hashed != user.password:
            return self.response_auth_failure()

        token = create_access_token(identity=user.id_caja)

        return Response(json.dumps({'access_token': token}), status=200, mimetype='application/json')
