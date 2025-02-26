import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1740575346634 implements MigrationInterface {
    name = 'InitialMigration1740575346634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invoiceNo" character varying(500) NOT NULL, "description" text NOT NULL, "paymentStatus" "public"."invoices_paymentstatus_enum" NOT NULL DEFAULT 'NOT_PAID', "currency" "public"."invoices_currency_enum" NOT NULL DEFAULT 'USD', "taxRate" integer NOT NULL, "issueDate" character varying NOT NULL, "dueDate" character varying NOT NULL, "note" text NOT NULL, "items" jsonb NOT NULL DEFAULT '[]', "taxAmount" integer NOT NULL, "subTotal" integer NOT NULL, "total" character varying NOT NULL, "amountPaid" integer NOT NULL DEFAULT '0', "outstandingBalance" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" uuid, CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(500) NOT NULL, "email" text NOT NULL, "phone" character varying(15) NOT NULL, "address" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_1df049f8943c6be0c1115541efb" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_1df049f8943c6be0c1115541efb"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
    }

}
