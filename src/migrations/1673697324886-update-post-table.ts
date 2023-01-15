import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1673697324886 implements MigrationInterface {
    name = 'updatePostTable1673697324886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '"2023-01-14T11:55:36.628Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '2023-01-14 11:28:27.525'`);
    }

}
