import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1672554841180 implements MigrationInterface {
    name = 'updatePostTable1672554841180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "tittle" TO "title"`);
        await queryRunner.query(`CREATE TABLE "message_user" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publish_date" TIMESTAMP, "user_id" character varying, "seen" integer DEFAULT '0', "messageId" uuid, CONSTRAINT "PK_54ce30caeb3f33d68398ea10376" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "to" text array, "title" character varying, "content" character varying, "recieve_type" character varying, "message_type" character varying, "publish_date" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "tittle"`);
        await queryRunner.query(`ALTER TABLE "Req" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "Req" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD "title" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD "do_date" TIMESTAMP DEFAULT '"2023-01-01T06:34:17.009Z"'`);
        await queryRunner.query(`ALTER TABLE "task" ADD "remain_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "check_status" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "Req" ALTER COLUMN "isDefault" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_user" ADD CONSTRAINT "FK_28f58f82a46ec61ee1b1c77fb95" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "message_user" DROP CONSTRAINT "FK_28f58f82a46ec61ee1b1c77fb95"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "Req" ALTER COLUMN "isDefault" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "check_status"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "remain_date"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "do_date"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "Req" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Req" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "tittle" character varying`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "message_user"`);
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "title" TO "tittle"`);
    }

}
