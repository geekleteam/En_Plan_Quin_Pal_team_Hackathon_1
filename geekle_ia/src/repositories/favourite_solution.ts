
import { EntityRepository, Repository } from "typeorm"

import { Solution } from "../models/solution"
import {FavouriteSolution} from "../models/favourite_solution";

@EntityRepository(FavouriteSolution)
export class FavouriteSolutionRepository extends Repository<FavouriteSolution> { }

