import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSolutionEntity1720343450858 implements MigrationInterface {
    name = 'CreateSolutionEntity1720343450858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "solution" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_73fc40b114205776818a2f2f248" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "solution"`);
    }

}
