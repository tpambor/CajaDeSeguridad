import hashlib
import base64
import os

def generate_salt():
    return base64.b64encode(os.urandom(16)).decode("utf-8")

def passwordhash_from_plaintext(password, salt):
    return hashlib.sha256((salt + password).encode('utf-8')).hexdigest()
