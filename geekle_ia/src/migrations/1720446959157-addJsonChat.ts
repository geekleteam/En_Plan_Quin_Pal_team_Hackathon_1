import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJsonChat1720446959157 implements MigrationInterface {
    name = 'AddJsonChat1720446959157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ADD "json" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "json"`);
    }

}
