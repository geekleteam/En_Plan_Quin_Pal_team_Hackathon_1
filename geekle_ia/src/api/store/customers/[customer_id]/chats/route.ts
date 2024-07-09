import {MedusaRequest, MedusaResponse} from "@medusajs/medusa";
import {EntityManager} from "typeorm";
import {Chat} from "../../../../../models/chat";

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {

    const { customer_id } = req.params;

    const manager: EntityManager = req.scope.resolve("manager")
    const repo = manager.getRepository(Chat)

    return res.json({
        chats: await repo.find({where: {customer_id: customer_id}, order: {created_at: 'DESC'}}),
    })

}


export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {

    const { customer_id } = req.params;
    //@ts-ignore
    const {title} = req.body;

    const manager: EntityManager = req.scope.resolve("manager")
    const repo = manager.getRepository(Chat)
    let chat = repo.create({title: title, customer_id: customer_id})
    await repo.save(chat)

    return res.json({
       chat: chat
    })

}