import {BeforeInsert, Column, Entity, JoinColumn, OneToMany} from "typeorm";
import {generateEntityId} from "@medusajs/utils";
import {BaseEntity} from "@medusajs/medusa";
import {CharacteristicSolution} from "./characteristic_solution";

@Entity()
export class Characteristic extends BaseEntity {

    @Column({type: 'varchar'})
    name: string | null;

    @OneToMany(() => CharacteristicSolution, (characteristic_solution) => characteristic_solution.characteristic)
    @JoinColumn({ name: "characteristic_id" })
    characteristic_solution: CharacteristicSolution[]

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "characteristic")
    }

}