import json
from flask import Blueprint, Response, request
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import db
from src.logica.LogicaCaja import LogicaCaja
from .util import class_route

blp = Blueprint("Claves", __name__)


@class_route(blp, "/claves")
class VistaClaves(MethodView):
    init_every_request = False

    @jwt_required()
    def get(self):
        logica = LogicaCaja(db.session, int(get_jwt_identity()))

        claves = logica.dar_claves_favoritas()

        return Response(json.dumps(claves), status=200, mimetype='application/json')

@class_route(blp, "/clave")
class VistaClave(MethodView):
    init_every_request = False

    @jwt_required()
    def post(self):
        logica = LogicaCaja(db.session, int(get_jwt_identity()))

        try:
            req = json.loads(request.data)
        except:
            return Response('JSON inválido', status=422, mimetype='text/plain')             


        if 'nombre' not in req:
            return Response('nombre is requerido', status=422, mimetype='text/plain') 

        if 'clave' not in req:
            return Response('clave is requerido', status=422, mimetype='text/plain') 

        if 'pista' not in req:
            return Response('pista is requerido', status=422, mimetype='text/plain') 

        validacion = logica.validar_crear_editar_clave(-1, req['nombre'], req['clave'], req['pista'])

        if validacion != '':
            return Response(validacion, status=422, mimetype='text/plain')            

        logica.crear_clave(req['nombre'], req['clave'], req['pista'])

        return Response(status=201)
