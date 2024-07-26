from db import db

class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)
    salt = db.Column(db.String(), nullable=False)
    id_caja = db.Column(db.Integer(), nullable=False)
