from geekle_ia_models.app.ai_service import AiService
from flask import Flask, request

def add_routes(app):
    app.add_url_rule('/example', view_func=example)
    app.add_url_rule('/safe', view_func=safe)

def example():
    return "ok"

def safe():
    prompt = request.args.get('prompt')  # Get the prompt from query parameters

    aiService = AiService()
    is_appropriate = aiService.promptIsAppropiate(prompt)

    if is_appropriate:
        return "The prompt is appropriate"
    else:
        return "The prompt is not appropriate"