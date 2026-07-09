import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { upload } from "../controllers/auth.controller.js";


const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;

router.post(
  "/",
  authenticate,
  upload.single("video"),
  uploadController.upload
);