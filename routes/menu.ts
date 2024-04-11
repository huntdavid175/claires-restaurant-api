import express, { Router, Request, Response } from "express";

import {
  addMenu,
  getMenu,
  getMenuByCategories,
  getMenuByCategory,
  getSingleMeal,
} from "../controllers/menu";
import { ValidateMenuCreate } from "../entity/schemas/validator";

import { sendWhatsappMessage } from "../controllers/whatsapp";

const router: Router = express.Router();

// Add menu item route
router.post("/", ValidateMenuCreate, addMenu);

// Retrieve menu items route
router.get("/", getMenu);

//Retrieve single item

router.post("/whatsapptest", sendWhatsappMessage);

// Retrieve menus by category
router.get("/categories/:id", getMenuByCategory);

// Retrieve all categries
router.get("/categories/", getMenuByCategories);

router.get("/:id", getSingleMeal);

export default router;
