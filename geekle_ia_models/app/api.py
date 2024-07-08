from geekle_ia_models.app.ai_service import AiService
from flask import Flask, request

ai_service = AiService()  # Initialize the AiService once

def add_routes(app):
    app.add_url_rule('/example', view_func=example)
    app.add_url_rule('/safe', view_func=safe)
    app.add_url_rule('/magic', view_func=magic)
    app.add_url_rule('/handleprompt', view_func=handleprompt, methods=['POST'])

def example():
    return "ok"

def safe():
    prompt = request.args.get('prompt')  # Get the prompt from query parameters
    is_appropriate = ai_service.promptIsAppropiate(prompt)

    if is_appropriate:
        return "The prompt is appropriate"
    else:
        return "The prompt is not appropriate"

def magic():
    prompt = request.args.get('prompt')  # Get the prompt from query parameters
    json = ai_service.magic(prompt)

    return json


def handleprompt():
    # Get the JSON body from the POST request
    request_data = request.get_json()

    # Log the JSON body
    print("Received JSON request: ", request_data)

    # Assume the JSON contains a key 'prompt' for simplicity
    messages = request_data

    # Process the prompt with the AI service
    response = ai_service.handleprompt(messages)

    # Return the response as JSON
    return response