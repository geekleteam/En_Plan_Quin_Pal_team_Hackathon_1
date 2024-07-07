from geekle_ia_models.app.llm import LocalLLM


class AiService:
    def __init__(self):
        self.llm = LocalLLM.get_instance()

    def promptIsAppropiate(self, user_prompt):
        messages = [
            {"role": "system", "content": "You are an AI that checks if the prompt is appropriate. You are going to answer with a single word: yes or no."},
        ]
        messages.append({"role": "user", "content": user_prompt})
        print("messages: ", messages)
        response = self.llm.generate_response(messages)

        print("response: ", response)

        # Check if the last message contains "yes"

        if 'yes' in response[-1]['content'].strip().lower():
            return True
        else:
            return False


