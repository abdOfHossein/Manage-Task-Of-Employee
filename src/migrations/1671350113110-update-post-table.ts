import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1671350113110 implements MigrationInterface {
    name = 'updatePostTable1671350113110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message_user" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publish_date" TIMESTAMP, "user_id" character varying, "content" character varying, "seen" integer, "messageId" uuid, CONSTRAINT "PK_54ce30caeb3f33d68398ea10376" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "to" text array, "title" character varying, "content" character varying, "recieve_type" character varying, "message_type" character varying, "publish_date" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message_user" ADD CONSTRAINT "FK_28f58f82a46ec61ee1b1c77fb95" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_446251f8ceb2132af01b68eb593" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_446251f8ceb2132af01b68eb593"`);
        await queryRunner.query(`ALTER TABLE "message_user" DROP CONSTRAINT "FK_28f58f82a46ec61ee1b1c77fb95"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "message_user"`);
    }

}
