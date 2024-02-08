import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Extras {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  price: number;
}
