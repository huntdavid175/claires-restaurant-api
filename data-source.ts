import { DataSource } from "typeorm";

import { Menu } from "./entity/menu";
import { Price } from "./entity/price";
import { Category } from "./entity/category";
import { Extras } from "./entity/extras";
import { Order } from "./entity/orders";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "fawaz",
  password: "",
  database: "clairepizza",
  synchronize: true,
  logging: false,
  entities: [Menu, Price, Category, Extras, Order],
  subscribers: [],
  migrations: [],
});
