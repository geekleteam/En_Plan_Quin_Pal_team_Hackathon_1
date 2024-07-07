from app.create_app import create_app

app, socketio = create_app()

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000,  allow_unsafe_werkzeug=True)