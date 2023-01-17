import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1673943853425 implements MigrationInterface {
    name = 'updatePostTable1673943853425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menu" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug_name" character varying NOT NULL, "base_order" integer NOT NULL, "parentId" uuid, "frontendId" uuid, "roleId" uuid, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role-backend" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleId" uuid, "backendId" uuid, CONSTRAINT "PK_9379731a695359e95c8e1759485" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_closure" ("ancestor_id" uuid NOT NULL, "descendant_id" uuid NOT NULL, CONSTRAINT "PK_111fd481e768f8a03a662f60751" PRIMARY KEY ("ancestor_id", "descendant_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5752111ca50110514898abc5e6" ON "menu_closure" ("ancestor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1dbcb2fac665807ac25c469d29" ON "menu_closure" ("descendant_id") `);
        await queryRunner.query(`ALTER TABLE "role" ADD "menuId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '"2023-01-17T08:24:21.502Z"'`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5" FOREIGN KEY ("parentId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_46fadf7e32ff41f9c9951e4ab48" FOREIGN KEY ("frontendId") REFERENCES "frontend"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_30ef5347dbbc52cb9d5b776a9fb" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role-backend" ADD CONSTRAINT "FK_0f63e452989ac7c666b36fab59b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role-backend" ADD CONSTRAINT "FK_dffaf0d831578ff8b458fea9e16" FOREIGN KEY ("backendId") REFERENCES "backend"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_16b9b059c68187a9fc1e2c2bf01" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_5752111ca50110514898abc5e6a" FOREIGN KEY ("ancestor_id") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_1dbcb2fac665807ac25c469d29e" FOREIGN KEY ("descendant_id") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_1dbcb2fac665807ac25c469d29e"`);
        await queryRunner.query(`ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_5752111ca50110514898abc5e6a"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_16b9b059c68187a9fc1e2c2bf01"`);
        await queryRunner.query(`ALTER TABLE "role-backend" DROP CONSTRAINT "FK_dffaf0d831578ff8b458fea9e16"`);
        await queryRunner.query(`ALTER TABLE "role-backend" DROP CONSTRAINT "FK_0f63e452989ac7c666b36fab59b"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_30ef5347dbbc52cb9d5b776a9fb"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_46fadf7e32ff41f9c9951e4ab48"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "do_date" SET DEFAULT '2023-01-17 07:02:18.704'`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "menuId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1dbcb2fac665807ac25c469d29"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5752111ca50110514898abc5e6"`);
        await queryRunner.query(`DROP TABLE "menu_closure"`);
        await queryRunner.query(`DROP TABLE "role-backend"`);
        await queryRunner.query(`DROP TABLE "menu"`);
    }

}
