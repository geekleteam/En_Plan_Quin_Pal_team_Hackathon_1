import {BeforeInsert, Column, Entity, JoinColumn, OneToMany} from "typeorm";
import {generateEntityId} from "@medusajs/utils";
import {BaseEntity} from "@medusajs/medusa";
import {Message} from "./message";

@Entity()
export class Chat extends BaseEntity {

    @Column({type: 'varchar'})
    customer_id: string | null;

    @Column({type: 'varchar'})
    title: string | null;

    @Column({type: 'jsonb'})
    json: object | null;

    @OneToMany(() => Message, (message) => message.chat, {eager: true})
    @JoinColumn({ name: "chat_id" })
    messages: Message[]

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "chat")
    }

}