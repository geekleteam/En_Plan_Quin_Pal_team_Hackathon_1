from geekle_ia_models.app.llm import LocalLLM


class AiService:
    def __init__(self):
        self.llm = LocalLLM.get_instance()
        self.currentConversation = []

    def promptIsAppropiate(self, user_prompt):
        messages = [{"role": "system", "content": "You are an AI that checks if the prompt is appropriate. You are going to answer with a single word: yes or no."},
                    {"role": "user",   "content": user_prompt}]
        print("messages: ", messages)
        response = self.llm.generate_response(messages)
        print("response: ", response)

        self.currentConversation = response

        # Check if the last message contains "yes"
        if 'yes' in response[-1]['content'].strip().lower():
            return True
        else:
            return False

    def magic(self, user_prompt):
        systemPrompt = """
            You are a smart AI assistant that helps providing factual information to search informatic solutions to users's prompts. Be concise and clear in your responses.
            You are going to provide JSON objects as solutions. They should allow to compare between options. Each object will have a set of properties. You should be able to filter in or out depending on value.
            
            The expected json should be an array of objects. Each object should have the the same properties buy may have different values. They should be booleans or categoric values with 3 values (LOW, MID, HIGH). At least should have the following:
            - name: the name of the option
            - description: a brief description of the option
            - pricing: the price of the option
            - license: the license of the option (open-source, commercial, etc)
            - scaling: the scalability of the option
            - performance: the performance of the option
            
            If you feel you need to add more properties, feel free to do it.
            
            If you feel you need more information, ask the user for it in chat style with short texts.
            
            You should provide at least 3 options to compare. The options should be related to the user prompt.
            
            In case you have enough information, You should provide ONLY a JSON object as a response without any boilerplate text.
        """

        if len(self.currentConversation) == 0:
            self.currentConversation.append({"role": "system", "content": systemPrompt})

        messages = self.currentConversation
        messages.append({"role": "user", "content": user_prompt})

        response = self.llm.generate_response(messages)
        self.currentConversation = response
        return response

    def handleprompt(self, chat):
        systemPrompt = """
            You are a smart AI assistant that helps providing factual information to search informatic solutions to users's prompts. Be concise and clear in your responses.
            You are going to provide JSON objects as solutions. They should allow to compare between options. Each object will have a set of properties. You should be able to filter in or out depending on value.

            The expected json should be an array of objects. Each object should have the the same properties buy may have different values. They should be booleans or categoric values with 3 values (LOW, MID, HIGH). At least should have the following:
            - name: the name of the option
            - description: a brief description of the option
            - pricing: the price of the option
            - license: the license of the option (open-source, commercial, etc)
            - scaling: the scalability of the option
            - performance: the performance of the option

            If you feel you need to add more properties, feel free to do it.

            If you feel you need more information, ask the user for it in chat style with short texts.

            You should provide at least 3 options to compare. The options should be related to the user prompt.

            In case you have enough information, You should provide ONLY a JSON object as a response without any boilerplate text.
        """

        if len(chat) == 0:
            chat.append({"role": "system", "content": systemPrompt})
        elif len(chat) >= 1: # if only one prompt is present and it is not system, add system add the beggining
            if chat[0]['role'] != 'system':
                chat.insert(0, {"role": "system", "content": systemPrompt})


        response = self.llm.generate_response(chat)
        self.currentConversation = response
        return response

