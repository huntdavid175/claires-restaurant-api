import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource, initializeDb } from "./database/data-source";

import Routes from "./routes/index";

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());

//App routes
app.use(Routes);

//Connect to database
initializeDb();

//Start server
app.listen("3000", () => {
  console.log("Serving on port 3000");
});
