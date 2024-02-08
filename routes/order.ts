import express, { Router } from "express";
import { createOrder, getAllOrders } from "../controllers/order";

const router: Router = express.Router();

router.get("/", getAllOrders);

router.post("/", createOrder);

export default router;
