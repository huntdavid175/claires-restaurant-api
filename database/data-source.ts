import { DataSource } from "typeorm";

import { Menu } from "../entity/menu";
import { Price } from "../entity/price";
import { Category } from "../entity/category";
import { Extras } from "../entity/extras";
import { PizzaOrder } from "../entity/orders";
import { Size } from "../entity/sizes";
import { Payment } from "../entity/payments";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "fawaz",
  password: "",
  database: "clairepizza",
  synchronize: true,
  logging: false,
  entities: [Menu, Price, Category, Extras, PizzaOrder, Size, Payment],
  subscribers: [],
  migrations: ["./database/migration/addPaymentTable"],
});

export const initializeDb = async () => {
  try {
    AppDataSource.initialize();

    // const predefinedSizes = ["Small", "Medium", "Large", "ExtraLarge"];

    // const sizeRepository = AppDataSource.getRepository(Size);
    // await Promise.all(
    //   predefinedSizes.map(async (sizeName) => {
    //     const existingSize = await sizeRepository.findOne({
    //       where: { name: sizeName },
    //     });

    //     if (!existingSize) {
    //       const size = new Size();
    //       size.name = sizeName;

    //       sizeRepository.save(size);
    //     }
    //   })
    // );
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};
