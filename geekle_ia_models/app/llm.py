import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

class LocalLLM:
    _instance = None

    def __init__(self, model_path, tokenizer_path):
        # Load the tokenizer and model from the local paths
        self.tokenizer = AutoTokenizer.from_pretrained(tokenizer_path, filename="Phi-3.1-mini-4k-instruct-Q8_0_L.gguf")
        self.model = AutoModelForCausalLM.from_pretrained(model_path)

    @staticmethod
    def get_instance():
        if LocalLLM._instance is None:
            model_path = "microsoft/Phi-3-mini-4k-instruct"
            tokenizer_path = "microsoft/Phi-3-mini-4k-instruct"
            LocalLLM._instance = LocalLLM(model_path, tokenizer_path)
        return LocalLLM._instance

    def parseText(self, text):
        messages = []  # List of dictionaries, each containing a "role" and "content" key
        for line in text.split("<|end|>"):
            if line.startswith("<|assistant|>"):
                messages.append({"role": "assistant", "content": line[len("<|assistant|>"):].strip()})
            elif line.startswith("<|user|>"):
                messages.append({"role": "user", "content": line[len("<|user|>"):].strip()})
            elif line.startswith("<|system|>"):
                messages.append({"role": "system", "content": line[len("<|system|>"):].strip()})
        return messages

    def generate_response(self, messages, max_new_tokens=4096):
        inputs = self.tokenizer.apply_chat_template(messages, add_generation_prompt=True, return_tensors="pt")
        print("cuda_avaiability: ", torch.cuda.is_available())
        print("torch: ", torch.__version__)
        # Use GPU if available
        device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        model = self.model.to(device)
        inputs_to_device = inputs.to(device)

        outputs = model.generate(inputs_to_device, max_new_tokens=max_new_tokens)
        text = self.tokenizer.batch_decode(outputs)[0]
        parsedText = self.parseText(text)
        return parsedText

# Example usage
if __name__ == "__main__":
    # model_path = "microsoft/Phi-3-mini-4k-instruct"
    # tokenizer_path = "microsoft/Phi-3-mini-4k-instruct"
    model_path = "bartowski/Phi-3.1-mini-4k-instruct-GGUF"
    tokenizer_path = "bartowski/Phi-3.1-mini-4k-instruct-GGUF"
    
    llm = LocalLLM(model_path, tokenizer_path)

    messages = [
        {"role": "system", "content": "You are a helpful AI assistant"},
        {"role": "user", "content": "Can you provide ways to eat combinations of bananas and dragonfruits?"},
        #{"role": "assistant", "content": "Sure! Here are your delicios bla bla bla"},
    ]
    response = llm.generate_response(messages)
    print(response)

