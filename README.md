# Phase_1-Team_3

1. add your PR
2. add a link to the live demo
3. add a link to the demo video
4. congratulate your team on Submission in the Discord Team Chat

Done!

*Please note: By submitting your code, you waive any IP rights after submission. You also agree to assist with installation if needed.

# Frontend and Backend
We used the recommended technology in the GeekleAI hackaton.

The AI backend is served with Flask.

The regular backend is handled with Medusa.

The frontend is done with NextJS.

# The LLM model
The LLM used is (`microsoft/Phi-3-mini-4k-instruct`), a resource efficient yet powerful model capable of directly generating the full output with all solutions and comparison points. That was achieved by carefully engineering the system's model prompt, which instructs about all the process to follow and points to consider generating the final comparison table in JSON format. 

### How it is run?
The model is run locally in the backend. A larger model like Llama3 may improve the result, but for prototyping a smaller model is preferable. The relevant implementation is found on the `ai_service.py` module. 

### Safety 
To ensure safety and security of using the LLM model, it itself does an assessment of the safety of the user prompts. The check ensures no bad actor can leverage the LLM for malicious solutions and the topic is related to development.

### Limitations 
Due to challenges related to make the recommended framework 'Medusa' work, limitations, we could not add more modularity and granularity we originally wanted. Ideally, we would do the steps on different calls of the LLM model, thus allow to have specialized small models for the easiest steps and larger and more expensive models for the complex steps.

# Demo
[Screencast from 09-07-24 12:42:55.webm](https://github.com/geekleteam/Phase_1-Team_3/assets/19463905/ee4f9ff4-7a38-4cb0-a52b-449605595946)

More can be found on the [Issue#1](https://github.com/geekleteam/Phase_1-Team_3/issues/1)