import express, { Router } from "express";
import { updateOrderTransaction } from "../controllers/payment";

const router: Router = express.Router();

router.post("/update", updateOrderTransaction);

export default router;
