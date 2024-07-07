from geekle_ia_models.app.ai_service import AiService


def add_routes(app):
    app.add_url_rule('/example', view_func=example)

def example():
    return "ok"

def appropiate_prompt(app):
    app.add_url_rule('/safe', view_func=safe)


def safe():
    prompt = app.args.get('prompt')  # veure d'on treure aixo

    aiService = AiService()
    aiService.promptIsAppropiate(prompt)

    if aiService:
        return "The prompt is appropiate"
    else:
        return "The prompt is not appropiate"