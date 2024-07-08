import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {generateEntityId} from "@medusajs/utils";
import {BaseEntity} from "@medusajs/medusa";
import {Solution} from "./solution";
import {Characteristic} from "./characteristic";

@Entity()
export class CharacteristicSolution extends BaseEntity {

    @Column({type: 'varchar'})
    value: string | null;

    @Column({ type: "varchar" })
    characteristic_id: string

    @Column({ type: "varchar" })
    solution_id: string

    @ManyToOne(() => Solution, (solution) => solution.characteristic_solutions)
    @JoinColumn({ name: "solution_id" })
    solution: Solution

    @ManyToOne(() => Characteristic, (characteristic) => characteristic.characteristic_solution)
    @JoinColumn({ name: "characteristic_id" })
    characteristic: Characteristic

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "characteristic_solution")
    }

}