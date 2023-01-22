import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1674301112843 implements MigrationInterface {
    name = 'updatePostTable1674301112843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."file_type_file_enum" RENAME TO "file_type_file_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."file_type_file_enum" AS ENUM('PROJECT', 'PROFILE')`);
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "type_file" TYPE "public"."file_type_file_enum" USING "type_file"::"text"::"public"."file_type_file_enum"`);
        await queryRunner.query(`DROP TYPE "public"."file_type_file_enum_old"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '"2023-01-21T11:39:08.886Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '2023-01-21 11:15:13.532'`);
        await queryRunner.query(`CREATE TYPE "public"."file_type_file_enum_old" AS ENUM('PROFILE', 'PROJCET')`);
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "type_file" TYPE "public"."file_type_file_enum_old" USING "type_file"::"text"::"public"."file_type_file_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."file_type_file_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."file_type_file_enum_old" RENAME TO "file_type_file_enum"`);
    }

}
