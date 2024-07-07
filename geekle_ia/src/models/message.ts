import {BeforeInsert, Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {generateEntityId} from "@medusajs/utils";
import {BaseEntity} from "@medusajs/medusa";
import {Chat} from "./chat";

@Entity()
export class Message extends BaseEntity {

    @Column({type: 'varchar'})
    chat_id: string | null;

    @Column({type: 'text'})
    content: string | null;

    @Column({type: 'varchar'})
    role: string | null;

    @ManyToOne(() => Chat, (chat) => chat.messages)
    @JoinColumn({ name: "chat_id" })
    chat: Chat

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "message")
    }

}