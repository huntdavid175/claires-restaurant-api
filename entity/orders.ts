import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  productName: string;

  @Column()
  address: string;

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
}
