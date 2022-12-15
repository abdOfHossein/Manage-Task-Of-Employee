import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1670908563814 implements MigrationInterface {
    name = 'updatePostTable1670908563814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_caff8aa759d27662f3c02a95d43"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_caff8aa759d27662f3c02a95d43" UNIQUE ("header_id")`);
    }

}
