import {MedusaRequest, MedusaResponse} from "@medusajs/medusa";
import {EntityManager} from "typeorm";
import { FavouriteSolution } from "../../../../../models/favourite_solution"
import {Message} from "@models/message";

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {

    const { customer_id } = req.params;
    const favouriteSolutionService = req.scope.resolve("favouriteSolutionService");
    const favouriteSolutions = await favouriteSolutionService.listFavouriteSolutions(customer_id);

    return res.json({
        solutions: favouriteSolutions.map(s => s.solution),
    })

}

export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {

    const { customer_id } = req.params;
    console.log(req.body);
    // @ts-ignore
    const {solution_id} = req.body;

    const manager: EntityManager = req.scope.resolve("manager")
    const repo = manager.getRepository(FavouriteSolution)
    const fab = repo.create({ solution_id: solution_id, customer_id: customer_id })
    await repo.save(fab)

    return res.json({
        result: "ok"
    })

}
