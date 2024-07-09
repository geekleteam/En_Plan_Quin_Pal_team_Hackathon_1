import {MedusaRequest, MedusaResponse} from "@medusajs/medusa";
import {EntityManager} from "typeorm";
import { FavouriteSolution } from "../../../../../models/favourite_solution"
import {Message} from "../../../../../models/message";

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
    // @ts-ignore
    let {solution_name, solution_id} = req.body;

    // create it if necessary
    if(!solution_id){
        const solutionService = req.scope.resolve("solutionService")
        let solution = await solutionService.getSolution(solution_name)
        solution_id = solution.id
    }

    const manager: EntityManager = req.scope.resolve("manager")
    const repo = manager.getRepository(FavouriteSolution)
    const fav = repo.create({ solution_id: solution_id, customer_id: customer_id })
    await repo.save(fav)

    return res.json({
        result: "ok"
    })

}
