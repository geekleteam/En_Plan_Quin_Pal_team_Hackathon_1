import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAssoc1720358717384 implements MigrationInterface {
    name = 'AddAssoc1720358717384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourite_solution" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourite_solution" ADD "name" character varying NOT NULL`);
    }

}
