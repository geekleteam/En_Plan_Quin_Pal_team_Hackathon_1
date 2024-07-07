import {MedusaRequest, MedusaResponse} from "@medusajs/medusa";
import {EntityManager} from "typeorm";
import { FavouriteSolution } from "../../../../../models/favourite_solution"

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
