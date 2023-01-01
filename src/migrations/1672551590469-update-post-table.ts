import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1672551590469 implements MigrationInterface {
    name = 'updatePostTable1672551590469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "tittle" TO "title"`);
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "tittle" TO "title"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '"2023-01-01T05:39:59.458Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "title" TO "tittle"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "title" TO "tittle"`);
    }

}
