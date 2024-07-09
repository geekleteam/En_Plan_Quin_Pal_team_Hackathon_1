import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, Unique} from "typeorm";
import {generateEntityId} from "@medusajs/utils";
import {BaseEntity} from "@medusajs/medusa";
import {Solution} from "./solution";

@Entity()
export class FavouriteSolution extends BaseEntity {

    @Column({ type: "varchar" })
    customer_id: string

    @Column({ type: "varchar" })
    solution_id: string

    @Unique(["customer_id", "solution_id"])

    @ManyToOne(() => Solution, (solution) => solution.favourite_solutions, { eager: true })
    @JoinColumn({ name: "solution_id" })
    solution: Solution

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "favourite_solution")
    }

}