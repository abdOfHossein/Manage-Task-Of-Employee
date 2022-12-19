import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1671434231372 implements MigrationInterface {
    name = 'updatePostTable1671434231372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_user" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "Req" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "Req" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "message_user" ALTER COLUMN "seen" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_user" ALTER COLUMN "seen" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Req" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Req" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "message_user" ADD "content" character varying`);
    }

}
