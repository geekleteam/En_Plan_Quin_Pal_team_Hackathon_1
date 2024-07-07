import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAssoc1720358629454 implements MigrationInterface {
    name = 'AddAssoc1720358629454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourite_solution" ADD "solution_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favourite_solution" ADD CONSTRAINT "FK_82c5ee59cab0b9d9ff2c285d88c" FOREIGN KEY ("solution_id") REFERENCES "solution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourite_solution" DROP CONSTRAINT "FK_82c5ee59cab0b9d9ff2c285d88c"`);
        await queryRunner.query(`ALTER TABLE "favourite_solution" DROP COLUMN "solution_id"`);
    }

}
