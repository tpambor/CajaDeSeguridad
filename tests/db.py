import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.modelo.declarative_base import init_db

def setup_database():
    engine = create_engine('sqlite:///:memory:', echo='CAJA_DB_DEBUG' in os.environ)
    session = sessionmaker(bind=engine)

    init_db(engine)

    return session()
