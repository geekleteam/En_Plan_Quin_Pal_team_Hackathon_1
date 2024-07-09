# The LLM model

The LLM used is (`microsoft/Phi-3-mini-4k-instruct`), a resource efficient yet powerful model capable of directly generating the full output with all solutions and comparison points. That was achieved by carefully engineering the system's model prompt which instructs about all the process to follow and points to consider to generate the final comparison table. The relevant implementation is found on the `ai_service.py` module.

To ensure safety and security of using the LLM model, it itself does an assesment of the safety of the prompt. The check ensures no bad actor can leverage the LLM for malicious solutions and the topic is related to developtment.

Due to challanges related to make the recommended framework 'Medusa' work, limitations 


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

