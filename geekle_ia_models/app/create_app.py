from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit
import logging
from app import api
from app.websocket import AINamespace

def create_app():

    # App
    app = Flask(__name__)

    # Logger
    file_handler = logging.FileHandler('debug.log')
    file_handler.setLevel(logging.DEBUG)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.DEBUG)

    # To show logger logs in gunicorn log:
    gunicorn_error_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers.extend(gunicorn_error_logger.handlers)
    app.logger.setLevel(logging.DEBUG)
    # app.logger.debug('this will show in the log')

    print('Created app')
    app.logger.info('Created App')
    app.logger.debug('this will show in the log')

    # API
    api.add_routes(app)

    # Websockets
    with app.app_context():
        socketio = SocketIO(app, cors_allowed_origins='*', logger=True, engineio_logger=True)
        socketio.on_namespace(AINamespace())
        print('Initialized websockets')

    return app, socketio