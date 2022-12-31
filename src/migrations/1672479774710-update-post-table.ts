import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1672479774710 implements MigrationInterface {
    name = 'updatePostTable1672479774710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "check_status" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "check_status"`);
    }

}
