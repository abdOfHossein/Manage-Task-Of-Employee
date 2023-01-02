import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1672638032644 implements MigrationInterface {
    name = 'updatePostTable1672638032644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '"2023-01-02T05:40:39.860Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '2023-01-02 05:36:40.9'`);
    }

}
