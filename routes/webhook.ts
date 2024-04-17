import express, { Router } from "express";
import {
  webhookGetRequests,
  webhookPostRequests,
} from "../controllers/whatsapp";
import { paymentWebHook } from "../controllers/webhook";

const router: Router = express.Router();

// router.get("/", webhookGetRequests);

// router.post("/", webhookPostRequests);

router.post("/", paymentWebHook);

export default router;
