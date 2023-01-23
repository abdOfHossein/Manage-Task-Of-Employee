import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1674387731859 implements MigrationInterface {
    name = 'updatePostTable1674387731859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth"."role" DROP CONSTRAINT "FK_16b9b059c68187a9fc1e2c2bf01"`);
        await queryRunner.query(`ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_5752111ca50110514898abc5e6a"`);
        await queryRunner.query(`ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_1dbcb2fac665807ac25c469d29e"`);
        await queryRunner.query(`CREATE TYPE "menu"."frontend_type_platform_enum" AS ENUM('mobile', 'web', 'desktop')`);
        await queryRunner.query(`CREATE TABLE "menu"."frontend" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug_name" character varying NOT NULL, "type_platform" "menu"."frontend_type_platform_enum" NOT NULL DEFAULT 'web', "description" text NOT NULL, "host" text NOT NULL, "route" text NOT NULL, CONSTRAINT "UQ_7addeeab0b0d9d436fc7b0d5717" UNIQUE ("route"), CONSTRAINT "PK_cd001452fb94b845b76dc8c1856" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu"."menu" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug_name" character varying NOT NULL, "base_order" integer NOT NULL, "parentId" uuid, "frontendId" uuid, "roleId" uuid, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu"."role-backend" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleId" uuid, "backendId" uuid, CONSTRAINT "PK_9379731a695359e95c8e1759485" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '"2023-01-22T11:42:30.441Z"'`);
        await queryRunner.query(`ALTER TABLE "menu"."menu" ADD CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5" FOREIGN KEY ("parentId") REFERENCES "menu"."menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu"."menu" ADD CONSTRAINT "FK_46fadf7e32ff41f9c9951e4ab48" FOREIGN KEY ("frontendId") REFERENCES "menu"."frontend"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu"."menu" ADD CONSTRAINT "FK_30ef5347dbbc52cb9d5b776a9fb" FOREIGN KEY ("roleId") REFERENCES "auth"."role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu"."role-backend" ADD CONSTRAINT "FK_0f63e452989ac7c666b36fab59b" FOREIGN KEY ("roleId") REFERENCES "auth"."role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu"."role-backend" ADD CONSTRAINT "FK_dffaf0d831578ff8b458fea9e16" FOREIGN KEY ("backendId") REFERENCES "menu"."backend"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."role" ADD CONSTRAINT "FK_16b9b059c68187a9fc1e2c2bf01" FOREIGN KEY ("menuId") REFERENCES "menu"."menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_5752111ca50110514898abc5e6a" FOREIGN KEY ("ancestor_id") REFERENCES "menu"."menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_1dbcb2fac665807ac25c469d29e" FOREIGN KEY ("descendant_id") REFERENCES "menu"."menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_1dbcb2fac665807ac25c469d29e"`);
        await queryRunner.query(`ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_5752111ca50110514898abc5e6a"`);
        await queryRunner.query(`ALTER TABLE "auth"."role" DROP CONSTRAINT "FK_16b9b059c68187a9fc1e2c2bf01"`);
        await queryRunner.query(`ALTER TABLE "menu"."role-backend" DROP CONSTRAINT "FK_dffaf0d831578ff8b458fea9e16"`);
        await queryRunner.query(`ALTER TABLE "menu"."role-backend" DROP CONSTRAINT "FK_0f63e452989ac7c666b36fab59b"`);
        await queryRunner.query(`ALTER TABLE "menu"."menu" DROP CONSTRAINT "FK_30ef5347dbbc52cb9d5b776a9fb"`);
        await queryRunner.query(`ALTER TABLE "menu"."menu" DROP CONSTRAINT "FK_46fadf7e32ff41f9c9951e4ab48"`);
        await queryRunner.query(`ALTER TABLE "menu"."menu" DROP CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '2023-01-22 11:26:49.101'`);
        await queryRunner.query(`DROP TABLE "menu"."role-backend"`);
        await queryRunner.query(`DROP TABLE "menu"."menu"`);
        await queryRunner.query(`DROP TABLE "menu"."frontend"`);
        await queryRunner.query(`DROP TYPE "menu"."frontend_type_platform_enum"`);
        await queryRunner.query(`ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_1dbcb2fac665807ac25c469d29e" FOREIGN KEY ("descendant_id") REFERENCES "auth"."menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_5752111ca50110514898abc5e6a" FOREIGN KEY ("ancestor_id") REFERENCES "auth"."menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."role" ADD CONSTRAINT "FK_16b9b059c68187a9fc1e2c2bf01" FOREIGN KEY ("menuId") REFERENCES "auth"."menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
