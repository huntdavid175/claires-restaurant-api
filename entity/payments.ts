import {
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  Entity,
} from "typeorm";

import { Order } from "./orders";

export enum PaymentStatus {
  Pending = "Pending",
  Paid = "Paid",
  Refunded = "Refunded",
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

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

  @OneToOne(() => Order, (order) => order.payment)
  //   @JoinColumn()
  order: Order;
}
