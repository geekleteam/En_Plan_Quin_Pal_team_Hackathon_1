import {MedusaRequest, MedusaResponse} from "@medusajs/medusa";
import {EntityManager} from "typeorm";
import {Chat} from "../../../../../../models/chat";

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {

    const { customer_id, chat_id } = req.params;
    const manager: EntityManager = req.scope.resolve("manager")
    const repo = manager.getRepository(Chat)

    return res.json({
        chat: await repo.findOneBy({customer_id: customer_id, id: chat_id}),
    })

}
