import { DataSource } from "typeorm";

import { Menu } from "../entity/menu";
import { Price } from "../entity/price";
import { Category } from "../entity/category";
import { Extras } from "../entity/extras";
import { PizzaOrder } from "../entity/orders";
import { Size } from "../entity/sizes";
import { Payment } from "../entity/payments";

import dotenv from "dotenv";

dotenv.config();

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "fawaz",
//   password: "",
//   database: "clairepizza",
//   synchronize: true,
//   logging: false,
//   entities: [Menu, Price, Category, Extras, PizzaOrder, Size, Payment],
//   subscribers: [],
//   migrations: ["./database/migration/addPaymentTable"],
// });

const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_HOST,
} = process.env;
export const AppDataSource = new DataSource({
  type: "postgres",
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [Menu, Category, Extras, PizzaOrder, Size, Payment],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  subscribers: [],
  migrations: ["./database/migration/addPaymentTable"],
});

export const initializeDb = async () => {
  try {
    return await AppDataSource.initialize();

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
    return -1;
  }
};
