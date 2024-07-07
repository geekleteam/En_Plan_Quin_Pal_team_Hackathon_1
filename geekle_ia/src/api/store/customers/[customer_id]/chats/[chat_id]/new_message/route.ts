import {MedusaRequest, MedusaResponse} from "@medusajs/medusa";
import {EntityManager} from "typeorm";
import {Chat} from "../../../../../../../models/chat";
import {Message} from "../../../../../../../models/message";

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const { customer_id, chat_id } = req.params;
    const { role, content} = req.body;

    const manager: EntityManager = req.scope.resolve("manager")
    const chatRepo = manager.getRepository(Chat)
    const messageRepo = manager.getRepository(Message)

    // TODO: return error if chat does not exist!

    const message = messageRepo.create({ content: content, role: role, chat_id: chat_id })
    await messageRepo.save(message)

    return res.json({
        chat: await chatRepo.findOneBy({customer_id: customer_id, id: chat_id}),
    })

}
