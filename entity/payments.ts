import {
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  Entity,
} from "typeorm";

import { PizzaOrder } from "./orders";
import { bigint } from "zod";

export enum PaymentStatus {
  Pending = "Pending",
  Paid = "Paid",
  Refunded = "Refunded",
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column({ type: "bigint", nullable: true })
  transaction_id: string;

  @Column({ nullable: true })
  payment_date: Date;

  @Column()
  payment_method: String;

  @Column()
  transaction_amount: Number;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.Pending })
  payment_status: PaymentStatus;

  @Column({ nullable: true })
  authorization_code: String;

  @Column({ nullable: true })
  payment_gateway: String;

  @Column()
  payment_currency: String;

  @Column({ nullable: true })
  payment_reference: String;

  @OneToOne(() => PizzaOrder, (pizzaOrder) => pizzaOrder.payment)
  //   @JoinColumn()
  pizzaOrder: PizzaOrder;
}
