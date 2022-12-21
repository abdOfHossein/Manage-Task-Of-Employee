import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1671601941103 implements MigrationInterface {
    name = 'updatePostTable1671601941103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "do_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "remain_date" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "remain_date"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "do_date"`);
    }

}
