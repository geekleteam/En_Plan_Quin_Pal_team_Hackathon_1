import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateChat1720369158304 implements MigrationInterface {
    name = 'UpdateChat1720369158304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" RENAME COLUMN "date" TO "title"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "title" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" RENAME COLUMN "title" TO "date"`);
    }

}
