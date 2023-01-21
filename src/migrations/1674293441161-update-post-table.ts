import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1674293441161 implements MigrationInterface {
    name = 'updatePostTable1674293441161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_b2d8e683f020f61115edea206b3"`);
        await queryRunner.query(`ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_1dbcb2fac665807ac25c469d29e"`);
        await queryRunner.query(`ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_5752111ca50110514898abc5e6a"`);
        await queryRunner.query(`CREATE TYPE "task"."Req_status_enum" AS ENUM('OPEN', 'DOING', 'DONE', 'CANCEL')`);
        await queryRunner.query(`CREATE TABLE "task"."Req" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "task"."Req_status_enum", "name" character varying, "description" character varying, "isDefault" boolean NOT NULL DEFAULT false, "projectId" uuid, CONSTRAINT "PK_48c539707c58f20d8b51ac31416" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task"."Project" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_name" character varying, "fileId" uuid, CONSTRAINT "UQ_9d3958c5545b695739e4cce7a0a" UNIQUE ("project_name"), CONSTRAINT "REL_0dfcaf1d5ea6621f282ca357d3" UNIQUE ("fileId"), CONSTRAINT "PK_2725f461500317f74b0c8f11859" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message"."message_user" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publish_date" TIMESTAMP, "user_id" character varying, "seen" integer DEFAULT '0', "messageId" uuid, CONSTRAINT "PK_54ce30caeb3f33d68398ea10376" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "message"."message_recieve_type_enum" AS ENUM('USERS', 'DEPARTMENT', 'ALL')`);
        await queryRunner.query(`CREATE TYPE "message"."message_message_type_enum" AS ENUM(' SUCCESS', 'WAITING', 'ERROR', 'INFO')`);
        await queryRunner.query(`CREATE TABLE "message"."message" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "to" uuid array, "title" character varying, "content" character varying, "recieve_type" "message"."message_recieve_type_enum", "message_type" "message"."message_message_type_enum", "publish_date" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "auth"."frontend_type_platform_enum" AS ENUM('mobile', 'web', 'desktop')`);
        await queryRunner.query(`CREATE TABLE "auth"."frontend" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug_name" character varying NOT NULL, "type_platform" "auth"."frontend_type_platform_enum" NOT NULL DEFAULT 'web', "description" text NOT NULL, "host" text NOT NULL, "route" text NOT NULL, CONSTRAINT "UQ_7addeeab0b0d9d436fc7b0d5717" UNIQUE ("route"), CONSTRAINT "PK_cd001452fb94b845b76dc8c1856" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."menu" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug_name" character varying NOT NULL, "base_order" integer NOT NULL, "parentId" uuid, "frontendId" uuid, "roleId" uuid, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu"."backend" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug_name" character varying, "route" character varying, "method" character varying, "query" character varying, "body" character varying, CONSTRAINT "UQ_52696e9cd133336a576fc9d3ec2" UNIQUE ("route"), CONSTRAINT "PK_3a4e2afb06b79a8055fd8cf71a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."role-backend" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleId" uuid, "backendId" uuid, CONSTRAINT "PK_9379731a695359e95c8e1759485" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."role" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_type" character varying, "role_default_status" boolean NOT NULL DEFAULT true, "menuId" uuid, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task"."rel_task" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying, "srcId" uuid, "refId" uuid, CONSTRAINT "REL_46f8e19c5d5b9f33da18d1bb2d" UNIQUE ("srcId"), CONSTRAINT "REL_d328bf1d77cb9e8da237ce1f1e" UNIQUE ("refId"), CONSTRAINT "PK_6d65469f689ec41c2a11ae17ea4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task"."TaskBlockOperation" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name_task_block_operation" character varying, "desription_task_block_operation" character varying, "taskId" uuid, CONSTRAINT "PK_25c540de5b808e7bcee959a882e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "task"."task_type_enum" AS ENUM('NEWTASK', 'FORWARD', 'RENEWAL', 'HOTFIX')`);
        await queryRunner.query(`CREATE TYPE "task"."task_status_enum" AS ENUM('WAITING', 'DOING', 'REL', 'PENDING', 'DOING_PARALLER', 'DONE', 'CANCEL', 'PUBLISH', 'QC_FAILED', 'CUSTOMER_FAILED', 'CUSTOMER_UPDATE', 'CHECK')`);
        await queryRunner.query(`CREATE TYPE "task"."task_check_status_enum" AS ENUM('RENEWAL', 'PEND', 'DONE', 'FOREWARD')`);
        await queryRunner.query(`CREATE TABLE "task"."task" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "priority" character varying, "title" character varying, "head_id" character varying, "do_date" TIMESTAMP DEFAULT '"2023-01-21T09:30:49.435Z"', "remain_date" TIMESTAMP, "type" "task"."task_type_enum", "duration" integer, "status" "task"."task_status_enum", "check_status" "task"."task_check_status_enum", "departmentRlId" uuid, "userId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "auth"."user_status_enum" AS ENUM('active', 'block')`);
        await queryRunner.query(`CREATE TABLE "auth"."user" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "phonenumber" character varying NOT NULL, "status" "auth"."user_status_enum" NOT NULL DEFAULT 'active', "departmentId" uuid, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_c1756d987198666d8b02af03439" UNIQUE ("phonenumber"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task"."department" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "header_id" character varying, "name_department" character varying, CONSTRAINT "UQ_e0cab513ea7cd45484855cac48f" UNIQUE ("name_department"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task"."DepartmentRl" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reqId" uuid, "departmentId" uuid, CONSTRAINT "PK_0e9f1b0ecdfe3fc7615a32f15d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth"."role_users_user" ("roleId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_46403d6ce64cde119287c876ca3" PRIMARY KEY ("roleId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ed6edac7184b013d4bd58d60e5" ON "auth"."role_users_user" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a88fcb405b56bf2e2646e9d479" ON "auth"."role_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "task"."Req" ADD CONSTRAINT "FK_6ed6d84ebc486f1a51232801d12" FOREIGN KEY ("projectId") REFERENCES "task"."Project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task"."Project" ADD CONSTRAINT "FK_0dfcaf1d5ea6621f282ca357d33" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_b2d8e683f020f61115edea206b3" FOREIGN KEY ("userId") REFERENCES "auth"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message"."message_user" ADD CONSTRAINT "FK_28f58f82a46ec61ee1b1c77fb95" FOREIGN KEY ("messageId") REFERENCES "message"."message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message"."message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "auth"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."menu" ADD CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5" FOREIGN KEY ("parentId") REFERENCES "auth"."menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."menu" ADD CONSTRAINT "FK_46fadf7e32ff41f9c9951e4ab48" FOREIGN KEY ("frontendId") REFERENCES "auth"."frontend"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."menu" ADD CONSTRAINT "FK_30ef5347dbbc52cb9d5b776a9fb" FOREIGN KEY ("roleId") REFERENCES "auth"."role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."role-backend" ADD CONSTRAINT "FK_0f63e452989ac7c666b36fab59b" FOREIGN KEY ("roleId") REFERENCES "auth"."role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."role-backend" ADD CONSTRAINT "FK_dffaf0d831578ff8b458fea9e16" FOREIGN KEY ("backendId") REFERENCES "menu"."backend"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."role" ADD CONSTRAINT "FK_16b9b059c68187a9fc1e2c2bf01" FOREIGN KEY ("menuId") REFERENCES "auth"."menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task"."rel_task" ADD CONSTRAINT "FK_46f8e19c5d5b9f33da18d1bb2d7" FOREIGN KEY ("srcId") REFERENCES "task"."task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task"."rel_task" ADD CONSTRAINT "FK_d328bf1d77cb9e8da237ce1f1ea" FOREIGN KEY ("refId") REFERENCES "task"."task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task"."TaskBlockOperation" ADD CONSTRAINT "FK_07f1cc4121d9c479a269f3308a9" FOREIGN KEY ("taskId") REFERENCES "task"."task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task"."task" ADD CONSTRAINT "FK_eebd5d2a074ee6cdde920afb1b2" FOREIGN KEY ("departmentRlId") REFERENCES "task"."DepartmentRl"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task"."task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "auth"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."user" ADD CONSTRAINT "FK_3d6915a33798152a079997cad28" FOREIGN KEY ("departmentId") REFERENCES "task"."department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task"."DepartmentRl" ADD CONSTRAINT "FK_364bebc92cdfd3f2a27f83c982e" FOREIGN KEY ("reqId") REFERENCES "task"."Req"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task"."DepartmentRl" ADD CONSTRAINT "FK_dd2187c5b1cd5f7dcf97f3ac14f" FOREIGN KEY ("departmentId") REFERENCES "task"."department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth"."role_users_user" ADD CONSTRAINT "FK_ed6edac7184b013d4bd58d60e54" FOREIGN KEY ("roleId") REFERENCES "auth"."role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "auth"."role_users_user" ADD CONSTRAINT "FK_a88fcb405b56bf2e2646e9d4797" FOREIGN KEY ("userId") REFERENCES "auth"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_5752111ca50110514898abc5e6a" FOREIGN KEY ("ancestor_id") REFERENCES "auth"."menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_1dbcb2fac665807ac25c469d29e" FOREIGN KEY ("descendant_id") REFERENCES "auth"."menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_1dbcb2fac665807ac25c469d29e"`);
        await queryRunner.query(`ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_5752111ca50110514898abc5e6a"`);
        await queryRunner.query(`ALTER TABLE "auth"."role_users_user" DROP CONSTRAINT "FK_a88fcb405b56bf2e2646e9d4797"`);
        await queryRunner.query(`ALTER TABLE "auth"."role_users_user" DROP CONSTRAINT "FK_ed6edac7184b013d4bd58d60e54"`);
        await queryRunner.query(`ALTER TABLE "task"."DepartmentRl" DROP CONSTRAINT "FK_dd2187c5b1cd5f7dcf97f3ac14f"`);
        await queryRunner.query(`ALTER TABLE "task"."DepartmentRl" DROP CONSTRAINT "FK_364bebc92cdfd3f2a27f83c982e"`);
        await queryRunner.query(`ALTER TABLE "auth"."user" DROP CONSTRAINT "FK_3d6915a33798152a079997cad28"`);
        await queryRunner.query(`ALTER TABLE "task"."task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "task"."task" DROP CONSTRAINT "FK_eebd5d2a074ee6cdde920afb1b2"`);
        await queryRunner.query(`ALTER TABLE "task"."TaskBlockOperation" DROP CONSTRAINT "FK_07f1cc4121d9c479a269f3308a9"`);
        await queryRunner.query(`ALTER TABLE "task"."rel_task" DROP CONSTRAINT "FK_d328bf1d77cb9e8da237ce1f1ea"`);
        await queryRunner.query(`ALTER TABLE "task"."rel_task" DROP CONSTRAINT "FK_46f8e19c5d5b9f33da18d1bb2d7"`);
        await queryRunner.query(`ALTER TABLE "auth"."role" DROP CONSTRAINT "FK_16b9b059c68187a9fc1e2c2bf01"`);
        await queryRunner.query(`ALTER TABLE "auth"."role-backend" DROP CONSTRAINT "FK_dffaf0d831578ff8b458fea9e16"`);
        await queryRunner.query(`ALTER TABLE "auth"."role-backend" DROP CONSTRAINT "FK_0f63e452989ac7c666b36fab59b"`);
        await queryRunner.query(`ALTER TABLE "auth"."menu" DROP CONSTRAINT "FK_30ef5347dbbc52cb9d5b776a9fb"`);
        await queryRunner.query(`ALTER TABLE "auth"."menu" DROP CONSTRAINT "FK_46fadf7e32ff41f9c9951e4ab48"`);
        await queryRunner.query(`ALTER TABLE "auth"."menu" DROP CONSTRAINT "FK_23ac1b81a7bfb85b14e86bd23a5"`);
        await queryRunner.query(`ALTER TABLE "message"."message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "message"."message_user" DROP CONSTRAINT "FK_28f58f82a46ec61ee1b1c77fb95"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_b2d8e683f020f61115edea206b3"`);
        await queryRunner.query(`ALTER TABLE "task"."Project" DROP CONSTRAINT "FK_0dfcaf1d5ea6621f282ca357d33"`);
        await queryRunner.query(`ALTER TABLE "task"."Req" DROP CONSTRAINT "FK_6ed6d84ebc486f1a51232801d12"`);
        await queryRunner.query(`DROP INDEX "auth"."IDX_a88fcb405b56bf2e2646e9d479"`);
        await queryRunner.query(`DROP INDEX "auth"."IDX_ed6edac7184b013d4bd58d60e5"`);
        await queryRunner.query(`DROP TABLE "auth"."role_users_user"`);
        await queryRunner.query(`DROP TABLE "task"."DepartmentRl"`);
        await queryRunner.query(`DROP TABLE "task"."department"`);
        await queryRunner.query(`DROP TABLE "auth"."user"`);
        await queryRunner.query(`DROP TYPE "auth"."user_status_enum"`);
        await queryRunner.query(`DROP TABLE "task"."task"`);
        await queryRunner.query(`DROP TYPE "task"."task_check_status_enum"`);
        await queryRunner.query(`DROP TYPE "task"."task_status_enum"`);
        await queryRunner.query(`DROP TYPE "task"."task_type_enum"`);
        await queryRunner.query(`DROP TABLE "task"."TaskBlockOperation"`);
        await queryRunner.query(`DROP TABLE "task"."rel_task"`);
        await queryRunner.query(`DROP TABLE "auth"."role"`);
        await queryRunner.query(`DROP TABLE "auth"."role-backend"`);
        await queryRunner.query(`DROP TABLE "menu"."backend"`);
        await queryRunner.query(`DROP TABLE "auth"."menu"`);
        await queryRunner.query(`DROP TABLE "auth"."frontend"`);
        await queryRunner.query(`DROP TYPE "auth"."frontend_type_platform_enum"`);
        await queryRunner.query(`DROP TABLE "message"."message"`);
        await queryRunner.query(`DROP TYPE "message"."message_message_type_enum"`);
        await queryRunner.query(`DROP TYPE "message"."message_recieve_type_enum"`);
        await queryRunner.query(`DROP TABLE "message"."message_user"`);
        await queryRunner.query(`DROP TABLE "task"."Project"`);
        await queryRunner.query(`DROP TABLE "task"."Req"`);
        await queryRunner.query(`DROP TYPE "task"."Req_status_enum"`);
        await queryRunner.query(`ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_5752111ca50110514898abc5e6a" FOREIGN KEY ("ancestor_id") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_1dbcb2fac665807ac25c469d29e" FOREIGN KEY ("descendant_id") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_b2d8e683f020f61115edea206b3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
