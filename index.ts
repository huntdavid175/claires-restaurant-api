import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source";

import MenuRoutes from "./routes/menu";
import OrderRoutes from "./routes/order";
import CategoryRoutes from "./routes/category";

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/menu", MenuRoutes);
app.use("/orders", OrderRoutes);
app.use("/category", CategoryRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((error) => console.log(error));

app.listen("3000", () => {
  console.log("Serving on port 3000");
});
