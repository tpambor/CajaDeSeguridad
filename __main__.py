import sys
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.vista.InterfazCajaSeguridad import App_CajaDeSeguridad
from src.logica.LogicaCaja import LogicaCaja

from src.modelo.declarative_base import init_db

def create_database_session():
    engine = create_engine(os.environ.get('CAJA_DB', 'sqlite:///aplicacion.sqlite'), echo='CAJA_DB_DEBUG' in os.environ)
    session = sessionmaker(bind=engine)

    return engine, session()

if __name__ == '__main__':
    # Punto inicial de la aplicación
    engine, session = create_database_session()

    init_db(engine)

    logica = LogicaCaja(session, 0)

    app = App_CajaDeSeguridad(sys.argv, logica)
    sys.exit(app.exec_())
