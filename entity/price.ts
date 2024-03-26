import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Menu } from "./menu";
import { Size } from "./sizes";

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  price: number;

  // @OneToOne(() => Menu, (menu) => menu.price)
  // @JoinColumn()
  // menu: Menu;

  // @ManyToOne(() => Size, (size) => size.prices)
  // size: Size;
}
