import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndices1720461724527 implements MigrationInterface {
    name = 'AddIndices1720461724527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solution" ADD "details" character varying`);
        await queryRunner.query(`ALTER TABLE "favourite_solution" DROP CONSTRAINT "FK_82c5ee59cab0b9d9ff2c285d88c"`);
        await queryRunner.query(`ALTER TABLE "favourite_solution" ADD CONSTRAINT "UQ_82c5ee59cab0b9d9ff2c285d88c" UNIQUE ("solution_id")`);
        await queryRunner.query(`ALTER TABLE "solution" ADD CONSTRAINT "UQ_959356b91a08b2d32bc2a47861f" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "favourite_solution" ADD CONSTRAINT "FK_82c5ee59cab0b9d9ff2c285d88c" FOREIGN KEY ("solution_id") REFERENCES "solution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourite_solution" DROP CONSTRAINT "FK_82c5ee59cab0b9d9ff2c285d88c"`);
        await queryRunner.query(`ALTER TABLE "solution" DROP CONSTRAINT "UQ_959356b91a08b2d32bc2a47861f"`);
        await queryRunner.query(`ALTER TABLE "favourite_solution" DROP CONSTRAINT "UQ_82c5ee59cab0b9d9ff2c285d88c"`);
        await queryRunner.query(`ALTER TABLE "favourite_solution" ADD CONSTRAINT "FK_82c5ee59cab0b9d9ff2c285d88c" FOREIGN KEY ("solution_id") REFERENCES "solution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "solution" DROP COLUMN "details"`);
    }

}
