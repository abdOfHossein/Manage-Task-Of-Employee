import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1671258365440 implements MigrationInterface {
    name = 'updatePostTable1671258365440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "userId" uuid`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'block')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "Req" ALTER COLUMN "isDefault" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "UQ_caff8aa759d27662f3c02a95d43"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "UQ_caff8aa759d27662f3c02a95d43" UNIQUE ("header_id")`);
        await queryRunner.query(`ALTER TABLE "Req" ALTER COLUMN "isDefault" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userId"`);
    }

}
