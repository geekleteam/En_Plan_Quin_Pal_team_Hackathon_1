# Phase_1-Team_3

# Frontend and Backend
We used the recommended technology in the GeekleAI hackaton.

The AI backend is served with Flask. The AI backend handles the LLM model.

The regular backend is handled with Medusa. The backend can handle users and their chats.

The frontend is done with NextJS. The UI is a prototype with support for a chat and users.

# The LLM model
The LLM used is (`microsoft/Phi-3-mini-4k-instruct`), a resource efficient yet powerful model capable of directly generating the full output with all solutions and comparison points. That was achieved by carefully engineering the system's model prompt, which instructs about all the process to follow and points to consider generating the final comparison table in JSON format. 

We are using open weights. The model uses 4B de parameters (4GB of storage), that is smaller than the smallest llama3 model (8B, 70B, 400B). 

The phi model is way faster and easier to scale and uses way less VRAM. We are running in local so there is no paid API service reliance. All the infrastructure is hosted in local. 

The "system" prompt works as a fine-tune of the model allowing it to be highly customizable. The code works with CPU and GPU albeit GPU being orders of magnitude faster. We have the model always up running to reduce start overhead. We 

We used Python 3.10 due to some stability issues found in newer versions.

### How it is run?
The model is run locally in the backend. A larger model like Llama3 may improve the result, but for prototyping a smaller model is preferable. The relevant implementation is found on the `ai_service.py` module. 

### Safety 
To ensure safety and security of using the LLM model, it itself does an assessment of the safety of the user prompts. The check ensures no bad actor can leverage the LLM for malicious solutions and the topic is related to development.

### Limitations 
Due to challenges related to make the recommended framework 'Medusa' work, limitations, we could not add more modularity and granularity we originally wanted. Ideally, we would do the steps on different calls of the LLM model, thus allow to have specialized small models for the easiest steps and larger and more expensive models for the complex steps.

# Demo
The videos can be found on the [Issue#1](https://github.com/geekleteam/Phase_1-Team_3/issues/1)

# Dockerized version:
Installing and running the back and front is quite easy. And, if you comment out the front and backend services in the docker-compose file, you can use it ro run a postgress container so you don't need to install postgres.
If you do so, you'll need to set the port in docker-compose db service to :
``` 
    ports:
      - "5432:5432"
```
You should be able to run the front by running (in the front directory)
``` 
npm i
npm run dev
```

and the back (in the geekle_ia directtory:
``` 
npm i
npm build
medusa migrations run
npm run dev
```

postgres should already be working when you do so

However, if you only want to try it out, you can use docker-compose to run the whole thing:

```
docker compose build
docker compose up
```


# Dockerized LLM server
Refer to the README found in the [geekle_ia_models](https://github.com/raquelhortab/GeekleAI-EnPlanQuinPal-Phase1/tree/master/geekle_ia_models) folder.
