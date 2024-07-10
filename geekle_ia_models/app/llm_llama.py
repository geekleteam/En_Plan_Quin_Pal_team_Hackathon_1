import time

import torch
from llama_cpp import Llama

class LlamaLLM:
    _instance = None

    def __init__(self, model_path, model_filename):
        # Load the tokenizer and model from the local paths
        self.model = Llama.from_pretrained(
            repo_id=model_path,
            filename=model_filename,
            verbose=False,
            main_gpu=0, 
            n_gpu_layers=2048,
            n_ctx=4096,
        )

    @staticmethod
    def get_instance():
        if LlamaLLM._instance is None:
            model_path = "bartowski/Phi-3.1-mini-4k-instruct-GGUF"
            model_filename = "Phi-3.1-mini-4k-instruct-Q8_0_L.gguf"
            LlamaLLM._instance = LlamaLLM(model_path, model_filename)
        return LlamaLLM._instance

    def generate_response(self, messages, max_new_tokens=4096):
        start = time.time()
        response = self.model.create_chat_completion(messages=messages, max_tokens=max_new_tokens)

        parsedText = response["choices"][0]["message"]["content"]
        print("Time taken: ", time.time() - start)
        print("tokens/sec: ", round(len(parsedText)/4.0 / (time.time() - start)),2)


        messages.append({"role": "assistant", "content": parsedText})

        return messages

# Example usage
if __name__ == "__main__":
    model_path = "bartowski/Phi-3.1-mini-4k-instruct-GGUF"
    model_filename = "Phi-3.1-mini-4k-instruct-Q8_0_L.gguf"
    
    llm = LlamaLLM(model_path, model_filename)

    messages = [
        {"role": "system", "content": "You are a helpful AI assistant"},
        {"role": "user", "content": "Can you provide ways to eat combinations of bananas and dragonfruits? Reply funny"},
    ]
    response = llm.generate_response(messages)
    print(response)

