import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1670835649373 implements MigrationInterface {
    name = 'updatePostTable1670835649373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Req" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "isDefault" boolean NOT NULL DEFAULT true, "projectId" uuid, CONSTRAINT "PK_48c539707c58f20d8b51ac31416" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Project" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_name" character varying, "fileId" uuid, CONSTRAINT "REL_0dfcaf1d5ea6621f282ca357d3" UNIQUE ("fileId"), CONSTRAINT "PK_2725f461500317f74b0c8f11859" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."file_manager_type_file_enum" AS ENUM('PROFILE', 'PROJET')`);
        await queryRunner.query(`CREATE TYPE "public"."file_manager_status_enum" AS ENUM('SUSPEND', 'MASTER', 'SUCCESS')`);
        await queryRunner.query(`CREATE TABLE "file_manager" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mime_type" character varying NOT NULL, "unq_file" character varying NOT NULL, "size" integer NOT NULL, "file" character varying NOT NULL, "file_path" character varying NOT NULL, "original" character varying, "type_file" "public"."file_manager_type_file_enum" NOT NULL, "status" "public"."file_manager_status_enum" NOT NULL DEFAULT 'SUSPEND', "userId" uuid, CONSTRAINT "UQ_8f5922ffea3c061d99bb5742c75" UNIQUE ("unq_file"), CONSTRAINT "PK_737201044e826a80ade8f858d81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_type" character varying NOT NULL DEFAULT 'USER', CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'block')`);
        await queryRunner.query(`CREATE TABLE "user" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying, "last_name" character varying, "username" character varying, "password" character varying, "email" character varying, "phonenumber" character varying, "status" "public"."user_status_enum" NOT NULL DEFAULT 'active', "role_default_status" boolean DEFAULT true, "departmentId" uuid, "roleId" uuid, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_c1756d987198666d8b02af03439" UNIQUE ("phonenumber"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "header_id" character varying, "name_department" character varying, CONSTRAINT "UQ_caff8aa759d27662f3c02a95d43" UNIQUE ("header_id"), CONSTRAINT "UQ_e0cab513ea7cd45484855cac48f" UNIQUE ("name_department"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rel_task" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying, "srcId" uuid, "refId" uuid, CONSTRAINT "REL_46f8e19c5d5b9f33da18d1bb2d" UNIQUE ("srcId"), CONSTRAINT "REL_d328bf1d77cb9e8da237ce1f1e" UNIQUE ("refId"), CONSTRAINT "PK_6d65469f689ec41c2a11ae17ea4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TaskBlockOperation" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name_task_block_operation" character varying, "desription_task_block_operation" character varying, "taskId" uuid, CONSTRAINT "PK_25c540de5b808e7bcee959a882e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "priority" character varying, "tittle" character varying, "head_id" character varying, "type" character varying, "duration" integer, "status" character varying, "departmentRlId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "DepartmentRl" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reqId" uuid, "departmentId" uuid, CONSTRAINT "PK_0e9f1b0ecdfe3fc7615a32f15d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "priority" character varying, "start_date" TIMESTAMP, "end_date" TIMESTAMP, "tittle" character varying, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "backend" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug_name" character varying, "route" character varying, "method" character varying, "query" character varying, "body" character varying, CONSTRAINT "PK_3a4e2afb06b79a8055fd8cf71a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."frontend_type_platform_enum" AS ENUM('mobile', 'web', 'desktop')`);
        await queryRunner.query(`CREATE TABLE "frontend" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug_name" character varying, "type_platform" "public"."frontend_type_platform_enum" NOT NULL DEFAULT 'web', "description" text, "host" text, "route" text NOT NULL, CONSTRAINT "PK_cd001452fb94b845b76dc8c1856" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Req" ADD CONSTRAINT "FK_6ed6d84ebc486f1a51232801d12" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Project" ADD CONSTRAINT "FK_0dfcaf1d5ea6621f282ca357d33" FOREIGN KEY ("fileId") REFERENCES "file_manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_manager" ADD CONSTRAINT "FK_0b65e5c1e7b54d33615f0dd74bd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_3d6915a33798152a079997cad28" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rel_task" ADD CONSTRAINT "FK_46f8e19c5d5b9f33da18d1bb2d7" FOREIGN KEY ("srcId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rel_task" ADD CONSTRAINT "FK_d328bf1d77cb9e8da237ce1f1ea" FOREIGN KEY ("refId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TaskBlockOperation" ADD CONSTRAINT "FK_07f1cc4121d9c479a269f3308a9" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_eebd5d2a074ee6cdde920afb1b2" FOREIGN KEY ("departmentRlId") REFERENCES "DepartmentRl"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "DepartmentRl" ADD CONSTRAINT "FK_364bebc92cdfd3f2a27f83c982e" FOREIGN KEY ("reqId") REFERENCES "Req"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "DepartmentRl" ADD CONSTRAINT "FK_dd2187c5b1cd5f7dcf97f3ac14f" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DepartmentRl" DROP CONSTRAINT "FK_dd2187c5b1cd5f7dcf97f3ac14f"`);
        await queryRunner.query(`ALTER TABLE "DepartmentRl" DROP CONSTRAINT "FK_364bebc92cdfd3f2a27f83c982e"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_eebd5d2a074ee6cdde920afb1b2"`);
        await queryRunner.query(`ALTER TABLE "TaskBlockOperation" DROP CONSTRAINT "FK_07f1cc4121d9c479a269f3308a9"`);
        await queryRunner.query(`ALTER TABLE "rel_task" DROP CONSTRAINT "FK_d328bf1d77cb9e8da237ce1f1ea"`);
        await queryRunner.query(`ALTER TABLE "rel_task" DROP CONSTRAINT "FK_46f8e19c5d5b9f33da18d1bb2d7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_3d6915a33798152a079997cad28"`);
        await queryRunner.query(`ALTER TABLE "file_manager" DROP CONSTRAINT "FK_0b65e5c1e7b54d33615f0dd74bd"`);
        await queryRunner.query(`ALTER TABLE "Project" DROP CONSTRAINT "FK_0dfcaf1d5ea6621f282ca357d33"`);
        await queryRunner.query(`ALTER TABLE "Req" DROP CONSTRAINT "FK_6ed6d84ebc486f1a51232801d12"`);
        await queryRunner.query(`DROP TABLE "frontend"`);
        await queryRunner.query(`DROP TYPE "public"."frontend_type_platform_enum"`);
        await queryRunner.query(`DROP TABLE "backend"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "DepartmentRl"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "TaskBlockOperation"`);
        await queryRunner.query(`DROP TABLE "rel_task"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "file_manager"`);
        await queryRunner.query(`DROP TYPE "public"."file_manager_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."file_manager_type_file_enum"`);
        await queryRunner.query(`DROP TABLE "Project"`);
        await queryRunner.query(`DROP TABLE "Req"`);
    }

}
