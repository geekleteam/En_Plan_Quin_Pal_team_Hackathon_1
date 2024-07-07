import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import { generateEntityId } from "@medusajs/utils";
import { BaseEntity, Customer } from "@medusajs/medusa";
import {Solution} from "./solution";

@Entity()
export class FavouriteSolution extends BaseEntity {


    @Column({ type: "varchar" })
    customer_id: string

    @Column({ type: "varchar" })
    solution_id: string

    @ManyToOne(() => Solution, (solution) => solution.favourite_solutions)
    @JoinColumn({ name: "solution_id" })
    solution: Solution

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "favourite_solution")
    }

}