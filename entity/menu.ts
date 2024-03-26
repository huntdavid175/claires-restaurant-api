import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Price } from "./price";
import { Category } from "./category";
import { Size } from "./sizes";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  food_name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  // @OneToOne(() => Price, (price) => price.menu, { cascade: true })
  // price: Price;

  @ManyToOne(() => Category, (category) => category.menus, { cascade: true })
  category: Category;

  @OneToMany(() => Size, (size) => size.menu, { cascade: true })
  sizes: Size[];
}
