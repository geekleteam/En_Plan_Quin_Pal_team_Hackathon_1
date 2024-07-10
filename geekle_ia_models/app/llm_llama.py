from llama_cpp import Llama

class LocalLLM:
    _instance = None

    def __init__(self, model_path, model_filename):
        # Load the tokenizer and model from the local paths
        self.model = Llama.from_pretrained(
            repo_id=model_path,
            filename=model_filename,
            verbose=False,
            main_gpu=0, 
            n_gpu_layers=2048
        )

    @staticmethod
    def get_instance():
        if LocalLLM._instance is None:
            model_path = "bartowski/Phi-3.1-mini-4k-instruct-GGUF"
            model_filename = "Phi-3.1-mini-4k-instruct-Q8_0_L.gguf"
            LocalLLM._instance = LocalLLM(model_path, model_filename)
        return LocalLLM._instance

    def generate_response(self, messages, max_new_tokens=2048):
        response = self.model.create_chat_completion(messages=messages)
        
        parsedText = response["choices"][0]["message"]["content"]

        messages.append({"role": "assistant", "content": parsedText})

        return messages

# Example usage
if __name__ == "__main__":
    model_path = "bartowski/Phi-3.1-mini-4k-instruct-GGUF"
    model_filename = "Phi-3.1-mini-4k-instruct-Q8_0_L.gguf"
    
    llm = LocalLLM(model_path, model_filename)

    messages = [
        {"role": "system", "content": "You are a helpful AI assistant"},
        {"role": "user", "content": "Can you provide ways to eat combinations of bananas and dragonfruits? Reply funny"},
    ]
    response = llm.generate_response(messages)
    print(response)

