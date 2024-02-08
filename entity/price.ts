import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Menu } from "./menu";

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  small: number;

  @Column("int")
  medium: number;

  @Column("int")
  large: number;

  @Column("int")
  extralarge: number;

  @OneToOne(() => Menu, (menu) => menu.price)
  @JoinColumn()
  menu: Menu;
}
