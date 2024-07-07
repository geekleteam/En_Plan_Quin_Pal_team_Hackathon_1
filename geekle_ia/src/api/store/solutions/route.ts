import {MedusaRequest, MedusaResponse} from "@medusajs/medusa";
import {EntityManager} from "typeorm";
import { Solution } from "../../../models/solution"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const manager: EntityManager = req.scope.resolve("manager")
    const solutionRepo = manager.getRepository(Solution)

    return res.json({
        posts: await solutionRepo.find(),
    })

}
