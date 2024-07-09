import {EntityManager} from "typeorm";
import {TransactionBaseService} from "@medusajs/medusa";
import {Lifetime} from "awilix"
import {Solution} from "../models/solution";
import ExternalApi from "../utils/external_api"

class SolutionService extends TransactionBaseService {

    static LIFE_TIME = Lifetime.SCOPED

    private api: ExternalApi;

    constructor(container) {
        super(container);
        // tried to do it Medusa way but config not working...
        // const configModule = container.resolve("configModule");
        // const baseUrl =  configModule.projectConfig.models_url;
        this.api = new ExternalApi( process.env.MODELS_URL);
    }

    async getSolution(solution_name: string) {

        const manager: EntityManager = this.activeManager_;
        const solutionRepo = manager.getRepository(Solution)
        let solution = await solutionRepo.findOneBy({name: solution_name});

        // we may or may not have this solution already saved
        // if not, we ask the LLM for details and create it
        if(!solution || !solution.details){
            let details = await this.api.getSolutionDetails(solution_name)
            if(solution) solution.details = details
            else solution = solutionRepo.create({name: solution_name, details: details})
            await solutionRepo.save(solution)
        }

        return solution;
    }
}

export default SolutionService;