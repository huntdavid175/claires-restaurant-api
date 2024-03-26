import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "reflect-metadata";
import multer from "multer";
import { AppDataSource, initializeDb } from "./database/data-source";
import { Size } from "./entity/sizes";

import MenuRoutes from "./routes/menu";
import OrderRoutes from "./routes/order";
import WebhookRoutes from "./routes/webhook";
import ImageRoutes from "./routes/image";

const app: Application = express();

const uploadFiles = multer({
  storage: multer.memoryStorage(),
  dest: "uploads/",
});

app.use(bodyParser.json());
app.use(cors());
app.use("/menu", MenuRoutes);
app.use("/orders", OrderRoutes);

app.use("/webhook", WebhookRoutes);

app.use("/images", uploadFiles.single("image"), ImageRoutes);

//Initialize database connection
// AppDataSource.initialize()
//   .then(() => {
//     console.log("connected to database successfully");
//     const sizeRepo = AppDataSource.getRepository(Size);

//     const sizes = ["Small", "Medium", "Large", "ExtraLarge"];

//     await.

//   })
//   .catch((error) => console.log(error))

initializeDb();

app.listen("3000", () => {
  console.log("Serving on port 3000");
});
