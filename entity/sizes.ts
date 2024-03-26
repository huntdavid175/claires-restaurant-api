import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Price } from "./price";
import { Menu } from "./menu";

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  //   @OneToMany(() => Price, (price) => price.size, { cascade: true })
  //   prices: Price[];

  @ManyToOne(() => Menu, (menu) => menu.sizes)
  menu: Menu;
}
