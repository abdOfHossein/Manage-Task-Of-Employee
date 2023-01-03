import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1672743435705 implements MigrationInterface {
    name = 'updatePostTable1672743435705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`CREATE TABLE "role_users_user" ("roleId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_46403d6ce64cde119287c876ca3" PRIMARY KEY ("roleId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ed6edac7184b013d4bd58d60e5" ON "role_users_user" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a88fcb405b56bf2e2646e9d479" ON "role_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "role_type"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "role_type" text array NOT NULL DEFAULT 'ADMIN'`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '"2023-01-03T10:57:31.439Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "first_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phonenumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role_default_status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_users_user" ADD CONSTRAINT "FK_ed6edac7184b013d4bd58d60e54" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_users_user" ADD CONSTRAINT "FK_a88fcb405b56bf2e2646e9d4797" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_users_user" DROP CONSTRAINT "FK_a88fcb405b56bf2e2646e9d4797"`);
        await queryRunner.query(`ALTER TABLE "role_users_user" DROP CONSTRAINT "FK_ed6edac7184b013d4bd58d60e54"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role_default_status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phonenumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "first_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '2023-01-01 06:34:17.009'`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "role_type"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "role_type" character varying NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a88fcb405b56bf2e2646e9d479"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed6edac7184b013d4bd58d60e5"`);
        await queryRunner.query(`DROP TABLE "role_users_user"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
