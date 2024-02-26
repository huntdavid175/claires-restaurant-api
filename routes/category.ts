import express, { Router } from "express";
import { getMenuByCategories } from "../controllers/menu";
import { getMenuByCategory } from "../controllers/category";

const router: Router = express.Router();

router.get("/", getMenuByCategories);
router.get("/menu", getMenuByCategory);

export default router;
