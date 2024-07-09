import { BaseService } from "medusa-interfaces";
import { EntityManager } from "typeorm";
import {Customer, TransactionBaseService, User} from "@medusajs/medusa";
import {Solution} from "../models/solution";
import {FavouriteSolution} from "../models/favourite_solution";
import {FavouriteSolutionRepository} from "../repositories/favourite_solution";
import {Lifetime} from "awilix"

class FavouriteSolutionService extends TransactionBaseService {

    static LIFE_TIME = Lifetime.SCOPED

    protected readonly loggedInCustomer: Customer | null
    protected readonly loggedInUser: User | null
    // protected repo_: typeof FavouriteSolutionRepository

    constructor(container) {
        super(container);
        try {
            this.loggedInCustomer = container.loggedInCustomer
            this.loggedInUser = container.loggedInUser
            // this.repo_ = container.favouriteSolutionRepository
        } catch (e) {
            // avoid errors when backend first runs
        }
    }

    async listFavouriteSolutions(customerId: any) {


        const repo = this.activeManager_.getRepository(FavouriteSolution)
        console.log("customerId")
        console.log( customerId)
        return await repo.find({ where: { customer_id: customerId } }); //
    }
}

export default FavouriteSolutionService;