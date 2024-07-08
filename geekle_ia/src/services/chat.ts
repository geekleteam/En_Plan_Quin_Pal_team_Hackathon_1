import {EntityManager} from "typeorm";
import {TransactionBaseService} from "@medusajs/medusa";
import {Lifetime} from "awilix"
import {Chat} from "../models/chat";
import {Message} from "../models/message";
import ExternalApi from "../utils/external_api"

class ChatService extends TransactionBaseService {

    static LIFE_TIME = Lifetime.SCOPED

    private api: ExternalApi;

    constructor(container) {
        super(container);
        // tried to do it Medusa way but config not working...
        // const configModule = container.resolve("configModule");
        // const baseUrl =  configModule.projectConfig.models_url;
        this.api = new ExternalApi( process.env.MODELS_URL);
    }

    async handlePrompt(customer_id: any, chat_id: string, content: string) {

        const manager: EntityManager = this.activeManager_;
        const chatRepo = manager.getRepository(Chat)
        const messageRepo = manager.getRepository(Message)

        const message = messageRepo.create({ content: content, role: 'user', chat_id: chat_id })
        await messageRepo.save(message)

        const chat = await chatRepo.findOneBy({ id: chat_id } );

        let response = await this.api.handlePrompt(chat)

        //const answer = messageRepo.create({ content: response, role: 'bot', chat_id: chat_id })
        //await messageRepo.save(answer)
        chat.json = response.data
        await chatRepo.save(chat)
        return chat.json;
    }
}

export default ChatService;