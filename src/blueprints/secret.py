import json
from flask import Blueprint, Response
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt_identity
from db import db
from src.logica.LogicaCaja import LogicaCaja
from .util import class_route

blp = Blueprint("Secretos", __name__)


@class_route(blp, "/secretos")
class VistaSecrets(MethodView):
    init_every_request = False

    @jwt_required()
    def get(self):
        logica = LogicaCaja(db.session, get_jwt_identity())

        elements = logica.dar_elementos()

        secrets = []
        for ele in elements:
            secret = {
                'nombre': ele['nombre_elemento'],
                'tipo': ele['tipo'],
                'notas': ele['notas']
            }

            if ele['tipo'] == 'Secreto':
                secret['secreto'] = {
                    'clave': ele['clave'],
                    'secreto': ele['secreto']
                }

            if ele['tipo'] == 'Tarjeta':
                secret['tarjeta'] = {
                    'clave': ele['clave'],
                    'numero': ele['numero'],
                    'titular': ele['titular'],
                    'ccv': ele['ccv'],
                    'direccion': ele['direccion'],
                    'telefono': ele['telefono'],
                    'fecha_venc': ele['fecha_venc']
                }

            if ele['tipo'] == 'Identificación':
                secret['identificacion'] = {
                    'numero': ele['numero'],
                    'nombre': ele['nombre'],
                    'fecha_exp': ele['fecha_exp'],
                    'fecha_venc': ele['fecha_venc'],
                    'fecha_nacimiento': ele['fecha_nacimiento']
                }

            if ele['tipo'] == 'Login':
                secret['login'] = {
                    'clave': ele['clave'],
                    'email': ele['email'],
                    'usuario': ele['usuario'],
                    'url': ele['url']
                }

            secrets.append(secret)

        return Response(json.dumps(secrets), status=200, mimetype='application/json')
