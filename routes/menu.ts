import express, { Router, Request, Response } from "express";

import {
  addMenu,
  getMenu,
  getMenuByCategories,
  getMenuByCategory,
} from "../controllers/menu";

const router: Router = express.Router();

// Add menu item route
router.post("/", addMenu);

// Retrieve menu items route
router.get("/", getMenu);

// Retrieve menus by category
router.get("/categories/:id", getMenuByCategory);

// Retrieve all categries
router.get("/categories/", getMenuByCategories);

export default router;
