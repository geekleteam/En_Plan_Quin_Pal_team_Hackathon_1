from flask_socketio import SocketIO, emit, Namespace
from flask import current_app


class AINamespace(Namespace):

    def __init__(self, namespace=None):
        super(AINamespace, self).__init__(namespace)


    def on_connect(self):
        current_app.logger.info('client connected')

    # @socketio.on('example')
    def on_example(self, json):
        content = json["content"]
        emit('ok', {"content": f"this is my response to \"{content}\""})

