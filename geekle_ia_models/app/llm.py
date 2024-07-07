import torch
from transformers import AutoModelForCausalLM, AutoTokenizer


class LocalLLM:
    def __init__(self, model_path, tokenizer_path):
        # Load the tokenizer and model from the local paths
        self.tokenizer = AutoTokenizer.from_pretrained(tokenizer_path)
        self.model = AutoModelForCausalLM.from_pretrained(model_path)

    def generate_response(self, messages, max_new_tokens=32):



        inputs = self.tokenizer.apply_chat_template(messages, add_generation_prompt=True, return_tensors="pt")

        outputs = self.model.generate(inputs, max_new_tokens=max_new_tokens)
        text = self.tokenizer.batch_decode(outputs)[0]
        return text

# Example usage
if __name__ == "__main__":
    model_path = "microsoft/Phi-3-mini-4k-instruct"

    tokenizer_path = "microsoft/Phi-3-mini-4k-instruct"
    llm = LocalLLM(model_path, tokenizer_path)

    messages = [{"role": "user", "content": "Can you provide ways to eat combinations of bananas and dragonfruits?"}]
    response = llm.generate_response(messages)
    print(response)

