from geekle_ia_models.app.ai_service import AiService
from flask import Flask, request

ai_service = AiService()  # Initialize the AiService once

def add_routes(app):
    app.add_url_rule('/example', view_func=example)
    app.add_url_rule('/safe', view_func=safe)

def example():
    return "ok"

def safe():
    prompt = request.args.get('prompt')  # Get the prompt from query parameters

    is_appropriate = ai_service.promptIsAppropiate(prompt)

    if is_appropriate:
        return "The prompt is appropriate"
    else:
        return "The prompt is not appropriate"