# The LLM model
The LLM used is (`microsoft/Phi-3-mini-4k-instruct`), a resource efficient yet powerful model capable of directly generating the full output with all solutions and comparison points. That was achieved by carefully engineering the system's model prompt, which instructs about all the process to follow and points to consider generating the final comparison table. 

### How it is run?
The model is run locally in the backend. A larger model like Llama3 may improve the result, but for prototyping a smaller model is preferable. The relevant implementation is found on the `ai_service.py` module. 

### Safety 
To ensure safety and security of using the LLM model, it itself does an assessment of the safety of the user prompts. The check ensures no bad actor can leverage the LLM for malicious solutions and the topic is related to development.

### Limitations 
Due to challenges related to make the recommended framework 'Medusa' work, limitations, we could not add more modularity and granularity we originally wanted. Ideally, we would do the steps on different calls of the LLM model, thus allow to have specialized small models for the easiest steps and larger and more expensive models for the complex steps.

## How to install

Create pip env and activate it:
```
python3 -m venv env
source env/bin/activate
```

Install requirements:
```
pip install -r requirements.txt
```

