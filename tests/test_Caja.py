#
# Pruebas unitarias para caja
#

import unittest
import os

from .db import setup_database

from src.modelo import Caja
from src.logica.LogicaCaja import LogicaCaja

class CajaTestCase(unittest.TestCase):

    def setUp(self):
        self.session = setup_database()
        self.logica = LogicaCaja(self.session, 1)

    def tearDown(self):
        self.session.query(Caja).delete()
        self.session.commit()
        self.session.close()

    # Prueba para verificar que la lógica retorna la clave maestra guardada en el base de datos
    def test_clave_maestra(self):
        clave = self.session.query(Caja).first().clave_maestra

        self.assertEqual(clave,self.logica.dar_claveMaestra())


