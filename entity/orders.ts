import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Payment } from "./payments";

@Entity()
export class PizzaOrder {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  productName: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  quantity: number;

  @Column()
  size: string;

  @Column()
  paid: boolean;

  @Column()
  processed: boolean;

  @Column()
  total: number;

  @CreateDateColumn()
  orderDate: Date;

  @OneToOne(() => Payment, (payment) => payment.pizzaOrder, { cascade: true })
  @JoinColumn()
  payment: Payment;
}
