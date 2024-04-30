import express, { Router } from "express";
import multer from "multer";

import MenuRoutes from "./menu";
import OrderRoutes from "./order";
import WebhookRoutes from "./webhook";
import ImageRoutes from "./image";
import PaymentRoutes from "./payment";
import TestRoutes from "./test";

const router: Router = express.Router();

const uploadFiles = multer({
  storage: multer.memoryStorage(),
  dest: "uploads/",
});

router.use("/menu", MenuRoutes);
router.use("/orders", OrderRoutes);

router.use("/webhook", WebhookRoutes);

router.use("/images", uploadFiles.single("image"), ImageRoutes);
router.use("/payment", PaymentRoutes);
router.use("/test", TestRoutes);

export default router;
