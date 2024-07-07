import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import { generateEntityId } from "@medusajs/utils";
import { BaseEntity } from "@medusajs/medusa";
import {FavouriteSolution} from "./favourite_solution";
import favourite_solution from "../services/favourite_solution";

@Entity()
export class Solution extends BaseEntity {

    @Column({type: 'varchar'})
    name: string | null;

    @OneToMany(() => FavouriteSolution, (favourite_solution) => favourite_solution.solution)
    @JoinColumn({ name: "solution_id" })
    favourite_solutions: FavouriteSolution[]

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "solution")
    }

}