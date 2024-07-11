# The LLM model
The LLM used is (`microsoft/Phi-3-mini-4k-instruct`), a resource efficient yet powerful model capable of directly generating the full output with all solutions and comparison points. That was achieved by carefully engineering the system's model prompt, which instructs about all the process to follow and points to consider generating the final comparison table in JSON format. 

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

Install requirements depending of your desired options:
```
pip install -r requirements-llama-cpu.txt
pip install -r requirements-llama-gpu.txt
pip install -r requirements-torch-gpu.txt
```
llama-gpu is the recommended option

A Dockerized version of the LLM server is provided.

I found a strange error which required adding a musl soft link which is dependant of the architecture (x86_64 vs arm64)

To build `docker build -t phi3_cpu` . and run `docker run -it -p 5000:5000 phi3_cpu` the docker.

The docker will try to download the model on the fly, which can take a lot of time. To avoid that the model can be included in the docker image and loaded from local file.
This needs to change
```
Llama.from_pretrained(
    repo_id=model_path,
    filename=model_filename,
    ...
)
```
to this to be replaced by this leaving the rest of parameters as is:
```
Llama(
    model_path="../Phi-3.1-mini-4k-instruct-Q8_0_L.gguf",
    ...
)
```
I plan to include the Dockerfile with GPU support later, although it is not required to run the AI Service (just a nice to have so that it runs faster)

