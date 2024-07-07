from geekle_ia_models.app.llm import LocalLLM


class AiService:
    def __init__(self):
        model_path = "microsoft/Phi-3-mini-4k-instruct"
        tokenizer_path = "microsoft/Phi-3-mini-4k-instruct"
        self.llm = LocalLLM(model_path, tokenizer_path)

    def promptIsAppropiate(self, user_prompt):
        messages = [
            {"role": "system", "content": "You are an AI that checks if the prompt is appropriate. You are going to answer with a single word: yes or no."},
        ]
        print("messages: ", messages)
        messages.append({"role": "user", "content": user_prompt})
        print("messages: ", messages)
        response = self.llm.generate_response(messages)

        if response[-1]['content'].strip().lower() == 'yes':
            return True
        else:
            return False


