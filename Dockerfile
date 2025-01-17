FROM python:3.12-alpine

COPY . /app

RUN pip install -r /app/requirements-web.txt

WORKDIR /app

CMD ["gunicorn",  "--bind", "0.0.0.0:8000", "app:create_app()"]
