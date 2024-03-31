import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaymentTable1627689104461 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE payment (
                payment_id SERIAL PRIMARY KEY,
                payment_date TIMESTAMP  DEFAULT now(),
                payment_method VARCHAR NOT NULL,
                transaction_amount VARCHAR NOT NULL,
                payment_status VARCHAR NOT NULL DEFAULT 'Pending',
                authorization_code INTEGER,
                payment_gateway VARCHAR,
                payment_currency VARCHAR,
                payment_reference VARCHAR ,
                order_id INTEGER,
                CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES "order" (id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE payment;
        `);
  }
}
