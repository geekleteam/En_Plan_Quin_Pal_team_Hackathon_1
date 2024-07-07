import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTablesChatMessageCharacteristic1720367682820 implements MigrationInterface {
    name = 'AddTablesChatMessageCharacteristic1720367682820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "characteristic" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_88f998ec743440a5c758e08ece4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "characteristic_solution" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "value" character varying NOT NULL, "characteristic_id" character varying NOT NULL, "solution_id" character varying NOT NULL, CONSTRAINT "PK_728d6f44a391240aa19f878f361" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "chat_id" character varying NOT NULL, "content" text NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "characteristic_solution" ADD CONSTRAINT "FK_f4b3a54cf184c46bb6b3eda12c6" FOREIGN KEY ("solution_id") REFERENCES "solution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characteristic_solution" ADD CONSTRAINT "FK_34e7129dab33f9827c94d7fff24" FOREIGN KEY ("characteristic_id") REFERENCES "characteristic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_859ffc7f95098efb4d84d50c632" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_859ffc7f95098efb4d84d50c632"`);
        await queryRunner.query(`ALTER TABLE "characteristic_solution" DROP CONSTRAINT "FK_34e7129dab33f9827c94d7fff24"`);
        await queryRunner.query(`ALTER TABLE "characteristic_solution" DROP CONSTRAINT "FK_f4b3a54cf184c46bb6b3eda12c6"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "characteristic_solution"`);
        await queryRunner.query(`DROP TABLE "characteristic"`);
    }

}
