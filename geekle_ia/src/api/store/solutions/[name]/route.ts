import {MedusaRequest, MedusaResponse} from "@medusajs/medusa";

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const {name} = req.params;

    const solutionService = req.scope.resolve("solutionService")
    let solution = await solutionService.getSolution(name)

    return res.json({
        solution: solution,
    })

}
