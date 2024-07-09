import {MedusaRequest, MedusaResponse} from "@medusajs/medusa";
import {EntityManager} from "typeorm";
import {Chat} from "../../../../../../../models/chat";
import {Message} from "../../../../../../../models/message";
import ChatService from "../../../../../../../services/chat";

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const { customer_id, chat_id } = req.params;
    // @ts-ignore
    const { content } = req.body;

    const chatService = req.scope.resolve("chatService")
    const answer = await chatService.handlePrompt(customer_id, chat_id, content)

    return res.json(answer)

}
