import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1674281618442 implements MigrationInterface {
    name = 'updatePostTable1674281618442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Project" ADD CONSTRAINT "UQ_9d3958c5545b695739e4cce7a0a" UNIQUE ("project_name")`);
        await queryRunner.query(`ALTER TABLE "frontend" ADD CONSTRAINT "UQ_7addeeab0b0d9d436fc7b0d5717" UNIQUE ("route")`);
        await queryRunner.query(`ALTER TABLE "backend" ADD CONSTRAINT "UQ_52696e9cd133336a576fc9d3ec2" UNIQUE ("route")`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '"2023-01-21T06:14:14.365Z"'`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "to"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "to" uuid array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "to"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "to" text array`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '2023-01-18 11:55:13.264'`);
        await queryRunner.query(`ALTER TABLE "backend" DROP CONSTRAINT "UQ_52696e9cd133336a576fc9d3ec2"`);
        await queryRunner.query(`ALTER TABLE "frontend" DROP CONSTRAINT "UQ_7addeeab0b0d9d436fc7b0d5717"`);
        await queryRunner.query(`ALTER TABLE "Project" DROP CONSTRAINT "UQ_9d3958c5545b695739e4cce7a0a"`);
    }

}
