import express, { Router } from "express";
import { createOrder, getAllOrders } from "../controllers/order";
import { ValidateOrderCreate } from "../entity/schemas/validator";

const router: Router = express.Router();

router.get("/", getAllOrders);

router.post("/", ValidateOrderCreate, createOrder);

export default router;
