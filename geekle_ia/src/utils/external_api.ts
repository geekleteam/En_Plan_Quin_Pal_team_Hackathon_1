// externalApi.js
import {Chat} from "../models/chat";

const axios = require('axios');

class ExternalApi {

    private client;

    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL,
            proxy: false
        });
    }

    async handlePrompt(chat: Chat) {
        return "{'this_is': 'a_json}"; // TODO: fake for now
        const endpoint = "/example_post"
        try {
            const response = await this.client.post(endpoint, chat.messages);
            return response.data;
        } catch (error) {
            console.error(`Error making POST request to ${endpoint}:`, error);
            throw error;
        }
    }

    async getSolutionDetails(solution_name: string){
        return "These are details"; // TODO: FAKE FOR NOW
        const endpoint = "/example_post"
        try {
            const response = await this.client.post(endpoint, solution_name);
            return response.data;
        } catch (error) {
            console.error(`Error making POST request to ${endpoint}:`, error);
            throw error;
        }
    }
}

export default ExternalApi;
