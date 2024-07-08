import { MigrationInterface, QueryRunner } from "typeorm";

export class TitleOptional1720468328438 implements MigrationInterface {
    name = 'TitleOptional1720468328438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "json"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "json" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "json"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "json" jsonb`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "title" SET NOT NULL`);
    }

}
