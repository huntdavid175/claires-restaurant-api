import express, { Router } from "express";
import {
  webhookGetRequests,
  webhookPostRequests,
} from "../controllers/whatsapp";

const router: Router = express.Router();

router.get("/", webhookGetRequests);

router.post("/", webhookPostRequests);

export default router;
