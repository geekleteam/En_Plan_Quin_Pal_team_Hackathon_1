import {BeforeInsert, Column, Entity, JoinColumn, OneToMany, Unique} from "typeorm";
import {generateEntityId} from "@medusajs/utils";
import {BaseEntity} from "@medusajs/medusa";
import {FavouriteSolution} from "./favourite_solution";
import {CharacteristicSolution} from "./characteristic_solution";

@Entity()
export class Solution extends BaseEntity {

    @Column({type: 'varchar', unique: true})
    name: string | null;

    @Column({type: String,  nullable: true})
    details!: string | null;

    @OneToMany(() => FavouriteSolution, (favourite_solution) => favourite_solution.solution)
    @JoinColumn({ name: "solution_id" })
    favourite_solutions: FavouriteSolution[]

    @OneToMany(() => CharacteristicSolution, (characteristic_solution) => characteristic_solution.solution)
    @JoinColumn({ name: "solution_id" })
    characteristic_solutions: CharacteristicSolution[]

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "solution")
    }

}