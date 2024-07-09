import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFavouriteSolutionEntity1720351732687 implements MigrationInterface {
    name = 'CreateFavouriteSolutionEntity1720351732687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favourite_solution" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "customer_id" character varying NOT NULL, CONSTRAINT "PK_0a00b485d2870362cd001124907" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "favourite_solution"`);
    }

}
