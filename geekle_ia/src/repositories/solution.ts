
import { EntityRepository, Repository } from "typeorm"

import { Solution } from "../models/solution"

@EntityRepository(Solution)
export class SolutionRepository extends Repository<Solution> { }