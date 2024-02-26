import express, { Router, Request, Response } from "express";

import { addMenu, getMenu, getMenuByCategories } from "../controllers/menu";
import { getMenuByCategory } from "../controllers/category";

const router: Router = express.Router();

// Add menu item route
router.post("/", addMenu);

// Retrieve menu items route
router.get("/", getMenu);

// Retrieve menus by category
router.get("/category", getMenuByCategory);

export default router;
