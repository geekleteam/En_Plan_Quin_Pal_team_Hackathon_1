
def add_routes(app):
    app.add_url_rule('/example', view_func=example)

def example():
    return "ok"

