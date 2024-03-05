import express, { Router } from "express";
import { imageUpload } from "../controllers/image";

const router: Router = express.Router();

router.post("/", imageUpload);

export default router;
